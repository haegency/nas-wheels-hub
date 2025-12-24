-- Create enum types
CREATE TYPE car_condition AS ENUM ('brand_new', 'foreign_used', 'nigerian_used');
CREATE TYPE car_status AS ENUM ('available', 'reserved', 'sold');
CREATE TYPE transmission_type AS ENUM ('automatic', 'manual');
CREATE TYPE fuel_type AS ENUM ('petrol', 'diesel', 'hybrid', 'electric');
CREATE TYPE body_type AS ENUM ('sedan', 'suv', 'coupe', 'truck', 'bus', 'hatchback', 'wagon', 'convertible');
CREATE TYPE lead_status AS ENUM ('new', 'contacted', 'closed');
CREATE TYPE lead_type AS ENUM ('general_inquiry', 'viewing_request', 'financing_request', 'trade_in', 'sell_car');
CREATE TYPE app_role AS ENUM ('admin', 'staff');

-- Create cars table
CREATE TABLE public.cars (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  trim TEXT,
  year INTEGER NOT NULL,
  price NUMERIC NOT NULL,
  discount_price NUMERIC,
  is_negotiable BOOLEAN DEFAULT false,
  mileage INTEGER DEFAULT 0,
  transmission transmission_type NOT NULL DEFAULT 'automatic',
  fuel_type fuel_type NOT NULL DEFAULT 'petrol',
  engine TEXT,
  exterior_color TEXT,
  interior_color TEXT,
  condition car_condition NOT NULL DEFAULT 'foreign_used',
  status car_status NOT NULL DEFAULT 'available',
  body_type body_type NOT NULL DEFAULT 'sedan',
  vin TEXT,
  location TEXT DEFAULT 'Karu, Abuja',
  description TEXT,
  inspection_notes TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_new_arrival BOOLEAN DEFAULT false,
  is_top_deal BOOLEAN DEFAULT false,
  main_image TEXT,
  images TEXT[] DEFAULT '{}',
  meta_title TEXT,
  meta_description TEXT,
  stock_id TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create leads table
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT,
  lead_type lead_type NOT NULL DEFAULT 'general_inquiry',
  status lead_status NOT NULL DEFAULT 'new',
  car_id UUID REFERENCES public.cars(id) ON DELETE SET NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create testimonials table
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT,
  rating INTEGER NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  content TEXT NOT NULL,
  car_purchased TEXT,
  photo TEXT,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create blog posts table
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  cover_image TEXT,
  is_published BOOLEAN DEFAULT false,
  author TEXT DEFAULT 'Nas Autos',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create site settings table
CREATE TABLE public.site_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  phone TEXT DEFAULT '+234 000 000 0000',
  whatsapp TEXT DEFAULT '+234 000 000 0000',
  email TEXT DEFAULT 'info@nasautos.com',
  address TEXT DEFAULT 'Karu, Abuja, Nigeria',
  business_hours TEXT DEFAULT 'Mon - Sat: 9:00 AM - 6:00 PM',
  facebook TEXT,
  instagram TEXT,
  twitter TEXT,
  hero_headline TEXT DEFAULT 'Your Trusted Auto Partner in Abuja',
  hero_subtext TEXT DEFAULT 'Premium new and pre-owned vehicles with transparent pricing',
  logo TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create profiles table for admin users
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

-- Enable RLS on all tables
ALTER TABLE public.cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Check if user is admin or staff
CREATE OR REPLACE FUNCTION public.is_admin_or_staff(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role IN ('admin', 'staff')
  )
$$;

-- RLS Policies for cars (public read, admin/staff write)
CREATE POLICY "Cars are viewable by everyone" ON public.cars FOR SELECT USING (true);
CREATE POLICY "Admin and staff can insert cars" ON public.cars FOR INSERT TO authenticated WITH CHECK (public.is_admin_or_staff(auth.uid()));
CREATE POLICY "Admin and staff can update cars" ON public.cars FOR UPDATE TO authenticated USING (public.is_admin_or_staff(auth.uid()));
CREATE POLICY "Admin and staff can delete cars" ON public.cars FOR DELETE TO authenticated USING (public.is_admin_or_staff(auth.uid()));

-- RLS Policies for leads (anyone can insert, admin/staff can read/update)
CREATE POLICY "Anyone can submit leads" ON public.leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin and staff can view leads" ON public.leads FOR SELECT TO authenticated USING (public.is_admin_or_staff(auth.uid()));
CREATE POLICY "Admin and staff can update leads" ON public.leads FOR UPDATE TO authenticated USING (public.is_admin_or_staff(auth.uid()));
CREATE POLICY "Admin and staff can delete leads" ON public.leads FOR DELETE TO authenticated USING (public.is_admin_or_staff(auth.uid()));

-- RLS Policies for testimonials
CREATE POLICY "Approved testimonials are public" ON public.testimonials FOR SELECT USING (is_approved = true);
CREATE POLICY "Admin can view all testimonials" ON public.testimonials FOR SELECT TO authenticated USING (public.is_admin_or_staff(auth.uid()));
CREATE POLICY "Admin can insert testimonials" ON public.testimonials FOR INSERT TO authenticated WITH CHECK (public.is_admin_or_staff(auth.uid()));
CREATE POLICY "Admin can update testimonials" ON public.testimonials FOR UPDATE TO authenticated USING (public.is_admin_or_staff(auth.uid()));
CREATE POLICY "Admin can delete testimonials" ON public.testimonials FOR DELETE TO authenticated USING (public.is_admin_or_staff(auth.uid()));

-- RLS Policies for blog posts
CREATE POLICY "Published posts are public" ON public.blog_posts FOR SELECT USING (is_published = true);
CREATE POLICY "Admin can view all posts" ON public.blog_posts FOR SELECT TO authenticated USING (public.is_admin_or_staff(auth.uid()));
CREATE POLICY "Admin can insert posts" ON public.blog_posts FOR INSERT TO authenticated WITH CHECK (public.is_admin_or_staff(auth.uid()));
CREATE POLICY "Admin can update posts" ON public.blog_posts FOR UPDATE TO authenticated USING (public.is_admin_or_staff(auth.uid()));
CREATE POLICY "Admin can delete posts" ON public.blog_posts FOR DELETE TO authenticated USING (public.is_admin_or_staff(auth.uid()));

-- RLS Policies for site settings
CREATE POLICY "Site settings are public" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Admin can update settings" ON public.site_settings FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin can insert settings" ON public.site_settings FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);

-- RLS Policies for user roles
CREATE POLICY "Admin can view all roles" ON public.user_roles FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin can manage roles" ON public.user_roles FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Create function to handle new user profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data ->> 'full_name');
  RETURN new;
END;
$$;

-- Create trigger for new user profiles
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Add updated_at triggers
CREATE TRIGGER update_cars_updated_at BEFORE UPDATE ON public.cars FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON public.leads FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Generate stock IDs automatically
CREATE OR REPLACE FUNCTION public.generate_stock_id()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.stock_id IS NULL THEN
    NEW.stock_id := 'NAS-' || LPAD(NEXTVAL('stock_id_seq')::TEXT, 5, '0');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE SEQUENCE IF NOT EXISTS stock_id_seq START 10001;

CREATE TRIGGER set_stock_id BEFORE INSERT ON public.cars FOR EACH ROW EXECUTE FUNCTION public.generate_stock_id();

-- Insert default site settings
INSERT INTO public.site_settings (phone, whatsapp, email, address, business_hours, hero_headline, hero_subtext)
VALUES (
  '+234 000 000 0000',
  '+234 000 000 0000', 
  'info@nasautos.com',
  'Karu, Abuja, Nigeria',
  'Mon - Sat: 9:00 AM - 6:00 PM',
  'Your Trusted Auto Partner in Abuja',
  'Premium new and pre-owned vehicles with transparent pricing and inspection support'
);