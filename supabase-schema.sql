-- Products Table
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  price INTEGER NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('attar', 'perfume')),
  gender TEXT NOT NULL CHECK (gender IN ('unisex', 'men', 'women')),
  image_url TEXT,
  description TEXT,
  in_stock BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Volumes Table (for Attars)
CREATE TABLE volumes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  volume TEXT NOT NULL,
  price INTEGER NOT NULL
);

-- RLS (Row Level Security) - Enable public read access
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE volumes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone."
  ON products FOR SELECT
  USING ( true );

CREATE POLICY "Public profiles are viewable by everyone."
  ON volumes FOR SELECT
  USING ( true );

-- (Optional) For the migration/admin panel to insert/update, you will likely need service_role keys or to disable RLS for write, OR setup an admin role.
-- For a simple admin panel without Supabase Auth, you can temporarily allow anon writes, but NOT recommended for production.
-- Ideally you use the service_role key server-side in your API routes.
