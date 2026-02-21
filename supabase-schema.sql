-- TermsZipp Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- USERS TABLE (extends Supabase auth.users)
-- =============================================
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  -- Subscription info
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'pro', 'premium')),
  subscription_status TEXT DEFAULT 'active' CHECK (subscription_status IN ('active', 'canceled', 'past_due', 'trialing')),
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT,
  subscription_period_end TIMESTAMPTZ,
  -- Usage tracking
  documents_generated_this_month INTEGER DEFAULT 0,
  documents_generated_total INTEGER DEFAULT 0,
  billing_cycle_start TIMESTAMPTZ DEFAULT NOW(),
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- DOCUMENTS TABLE
-- =============================================
CREATE TABLE public.documents (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  -- Document info
  document_type TEXT NOT NULL CHECK (document_type IN ('privacy-policy', 'terms-of-service', 'cookie-policy', 'disclaimer', 'refund-policy', 'eula')),
  title TEXT NOT NULL,
  -- Form data (stored as JSON)
  form_data JSONB NOT NULL,
  -- Generated content
  content TEXT NOT NULL,
  -- Metadata
  is_favorite BOOLEAN DEFAULT FALSE,
  last_downloaded_at TIMESTAMPTZ,
  download_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- TEAM MEMBERS TABLE (Premium feature)
-- =============================================
CREATE TABLE public.team_members (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  team_owner_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  member_email TEXT NOT NULL,
  member_user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  role TEXT DEFAULT 'member' CHECK (role IN ('admin', 'member')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'removed')),
  invited_at TIMESTAMPTZ DEFAULT NOW(),
  joined_at TIMESTAMPTZ,
  UNIQUE(team_owner_id, member_email)
);

-- =============================================
-- CONTACT SUBMISSIONS TABLE
-- =============================================
CREATE TABLE public.contact_submissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'closed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- INDEXES
-- =============================================
CREATE INDEX idx_documents_user_id ON public.documents(user_id);
CREATE INDEX idx_documents_type ON public.documents(document_type);
CREATE INDEX idx_documents_created ON public.documents(created_at DESC);
CREATE INDEX idx_team_members_owner ON public.team_members(team_owner_id);
CREATE INDEX idx_team_members_email ON public.team_members(member_email);
CREATE INDEX idx_profiles_stripe_customer ON public.profiles(stripe_customer_id);

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Documents policies
CREATE POLICY "Users can view own documents"
  ON public.documents FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own documents"
  ON public.documents FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own documents"
  ON public.documents FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own documents"
  ON public.documents FOR DELETE
  USING (auth.uid() = user_id);

-- Team members can view documents of team owner (Premium feature)
CREATE POLICY "Team members can view team documents"
  ON public.documents FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.team_members
      WHERE team_owner_id = documents.user_id
      AND member_user_id = auth.uid()
      AND status = 'active'
    )
  );

-- Team members policies
CREATE POLICY "Team owners can manage their team"
  ON public.team_members FOR ALL
  USING (auth.uid() = team_owner_id);

CREATE POLICY "Team members can view their membership"
  ON public.team_members FOR SELECT
  USING (member_user_id = auth.uid());

-- Contact submissions policies
CREATE POLICY "Anyone can submit contact form"
  ON public.contact_submissions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can view own submissions"
  ON public.contact_submissions FOR SELECT
  USING (auth.uid() = user_id OR user_id IS NULL);

-- =============================================
-- FUNCTIONS
-- =============================================

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_documents_updated_at
  BEFORE UPDATE ON public.documents
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Function to reset monthly document count
CREATE OR REPLACE FUNCTION public.reset_monthly_documents()
RETURNS void AS $$
BEGIN
  UPDATE public.profiles
  SET 
    documents_generated_this_month = 0,
    billing_cycle_start = NOW()
  WHERE billing_cycle_start < NOW() - INTERVAL '1 month';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check document limit
CREATE OR REPLACE FUNCTION public.can_generate_document(user_uuid UUID)
RETURNS BOOLEAN AS $$
DECLARE
  user_tier TEXT;
  docs_this_month INTEGER;
BEGIN
  SELECT subscription_tier, documents_generated_this_month
  INTO user_tier, docs_this_month
  FROM public.profiles
  WHERE id = user_uuid;
  
  -- Premium users have unlimited
  IF user_tier = 'premium' THEN
    RETURN TRUE;
  END IF;
  
  -- Pro users get 25/month
  IF user_tier = 'pro' AND docs_this_month < 25 THEN
    RETURN TRUE;
  END IF;
  
  -- Free users get 0 full documents
  RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment document count
CREATE OR REPLACE FUNCTION public.increment_document_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.profiles
  SET 
    documents_generated_this_month = documents_generated_this_month + 1,
    documents_generated_total = documents_generated_total + 1
  WHERE id = NEW.user_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_document_created
  AFTER INSERT ON public.documents
  FOR EACH ROW EXECUTE FUNCTION public.increment_document_count();

-- =============================================
-- SUBSCRIPTION TIER LIMITS
-- =============================================
-- Free: 0 full documents, preview only
-- Pro: 25 documents/month, 50 saved max
-- Premium: Unlimited documents, unlimited saved

-- Function to check saved document limit
CREATE OR REPLACE FUNCTION public.can_save_document(user_uuid UUID)
RETURNS BOOLEAN AS $$
DECLARE
  user_tier TEXT;
  saved_docs INTEGER;
BEGIN
  SELECT subscription_tier INTO user_tier
  FROM public.profiles WHERE id = user_uuid;
  
  SELECT COUNT(*) INTO saved_docs
  FROM public.documents WHERE user_id = user_uuid;
  
  -- Premium = unlimited
  IF user_tier = 'premium' THEN RETURN TRUE; END IF;
  
  -- Pro = 50 max
  IF user_tier = 'pro' AND saved_docs < 50 THEN RETURN TRUE; END IF;
  
  -- Free = 0
  RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- SAMPLE DATA (optional - for testing)
-- =============================================
-- Uncomment if you want test data

-- INSERT INTO public.profiles (id, email, full_name, subscription_tier)
-- VALUES 
--   ('00000000-0000-0000-0000-000000000001', 'pro@test.com', 'Pro User', 'pro'),
--   ('00000000-0000-0000-0000-000000000002', 'premium@test.com', 'Premium User', 'premium');
