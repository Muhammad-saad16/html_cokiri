import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`orders\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order_id\` text NOT NULL,
  	\`status\` text DEFAULT 'new' NOT NULL,
  	\`product_id\` integer,
  	\`product_name\` text,
  	\`product_code\` text,
  	\`quantity\` numeric NOT NULL,
  	\`unit_price\` numeric,
  	\`delivery\` numeric,
  	\`total\` numeric,
  	\`payment_method\` text DEFAULT 'cod' NOT NULL,
  	\`payment_status\` text DEFAULT 'cod' NOT NULL,
  	\`payment_ref\` text,
  	\`payer_account\` text,
  	\`customer_name\` text NOT NULL,
  	\`phone\` text NOT NULL,
  	\`email\` text,
  	\`country\` text,
  	\`city\` text,
  	\`address\` text,
  	\`note\` text,
  	\`admin_notes\` text,
  	\`email_sent\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`orders_order_id_idx\` ON \`orders\` (\`order_id\`);`)
  await db.run(sql`CREATE INDEX \`orders_product_idx\` ON \`orders\` (\`product_id\`);`)
  await db.run(sql`CREATE INDEX \`orders_updated_at_idx\` ON \`orders\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`orders_created_at_idx\` ON \`orders\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`products_details\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_details_order_idx\` ON \`products_details\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_details_parent_id_idx\` ON \`products_details\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`products\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`code\` text NOT NULL,
  	\`category_id\` integer NOT NULL,
  	\`sub_category\` text,
  	\`tag\` text,
  	\`video_id\` integer,
  	\`description\` text NOT NULL,
  	\`status\` text DEFAULT 'published',
  	\`price\` numeric,
  	\`sale_price\` numeric,
  	\`track_inventory\` integer DEFAULT true,
  	\`stock\` numeric DEFAULT 0,
  	\`featured\` integer,
  	\`is_new\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`video_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`products_code_idx\` ON \`products\` (\`code\`);`)
  await db.run(sql`CREATE INDEX \`products_category_idx\` ON \`products\` (\`category_id\`);`)
  await db.run(sql`CREATE INDEX \`products_video_idx\` ON \`products\` (\`video_id\`);`)
  await db.run(sql`CREATE INDEX \`products_updated_at_idx\` ON \`products\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`products_created_at_idx\` ON \`products\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`products_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`media_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_rels_order_idx\` ON \`products_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`products_rels_parent_idx\` ON \`products_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`products_rels_path_idx\` ON \`products_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`products_rels_media_id_idx\` ON \`products_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`categories_subcategories\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`categories_subcategories_order_idx\` ON \`categories_subcategories\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`categories_subcategories_parent_id_idx\` ON \`categories_subcategories\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`categories\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`kicker\` text,
  	\`intro\` text,
  	\`image_id\` integer,
  	\`order\` numeric DEFAULT 0,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`categories_slug_idx\` ON \`categories\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`categories_image_idx\` ON \`categories\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`categories_updated_at_idx\` ON \`categories\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`categories_created_at_idx\` ON \`categories\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`slides\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`video_id\` integer,
  	\`badge\` text NOT NULL,
  	\`show_logo\` integer,
  	\`title\` text,
  	\`subtitle\` text,
  	\`text\` text NOT NULL,
  	\`button_label\` text DEFAULT 'Shop Now' NOT NULL,
  	\`link\` text DEFAULT '/shop' NOT NULL,
  	\`active\` integer DEFAULT true,
  	\`order\` numeric DEFAULT 0,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`video_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`slides_image_idx\` ON \`slides\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`slides_video_idx\` ON \`slides\` (\`video_id\`);`)
  await db.run(sql`CREATE INDEX \`slides_updated_at_idx\` ON \`slides\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`slides_created_at_idx\` ON \`slides\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`offers\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`badge\` text NOT NULL,
  	\`title\` text NOT NULL,
  	\`text\` text,
  	\`image_id\` integer NOT NULL,
  	\`button_label\` text DEFAULT 'Shop Now' NOT NULL,
  	\`link\` text DEFAULT '/shop' NOT NULL,
  	\`active\` integer DEFAULT true,
  	\`ends_at\` text,
  	\`order\` numeric DEFAULT 0,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`offers_image_idx\` ON \`offers\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`offers_updated_at_idx\` ON \`offers\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`offers_created_at_idx\` ON \`offers\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`testimonials\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`city\` text,
  	\`country\` text DEFAULT 'Pakistan',
  	\`quote\` text NOT NULL,
  	\`rating\` numeric DEFAULT 5 NOT NULL,
  	\`product_id\` integer,
  	\`photo_id\` integer,
  	\`active\` integer DEFAULT true,
  	\`order\` numeric DEFAULT 0,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`testimonials_product_idx\` ON \`testimonials\` (\`product_id\`);`)
  await db.run(sql`CREATE INDEX \`testimonials_photo_idx\` ON \`testimonials\` (\`photo_id\`);`)
  await db.run(sql`CREATE INDEX \`testimonials_updated_at_idx\` ON \`testimonials\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`testimonials_created_at_idx\` ON \`testimonials\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`alt\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric
  );
  `)
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE TABLE \`users_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_sessions_order_idx\` ON \`users_sessions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`users_sessions_parent_id_idx\` ON \`users_sessions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`reset_password_requested_at\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`orders_id\` integer,
  	\`products_id\` integer,
  	\`categories_id\` integer,
  	\`slides_id\` integer,
  	\`offers_id\` integer,
  	\`testimonials_id\` integer,
  	\`media_id\` integer,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`orders_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`products_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`slides_id\`) REFERENCES \`slides\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`offers_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`testimonials_id\`) REFERENCES \`testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_orders_id_idx\` ON \`payload_locked_documents_rels\` (\`orders_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_products_id_idx\` ON \`payload_locked_documents_rels\` (\`products_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_categories_id_idx\` ON \`payload_locked_documents_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_slides_id_idx\` ON \`payload_locked_documents_rels\` (\`slides_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_offers_id_idx\` ON \`payload_locked_documents_rels\` (\`offers_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_testimonials_id_idx\` ON \`payload_locked_documents_rels\` (\`testimonials_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payments_cod_countries\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payments\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payments_cod_countries_order_idx\` ON \`payments_cod_countries\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payments_cod_countries_parent_idx\` ON \`payments_cod_countries\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`payments_easypaisa_countries\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payments\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payments_easypaisa_countries_order_idx\` ON \`payments_easypaisa_countries\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payments_easypaisa_countries_parent_idx\` ON \`payments_easypaisa_countries\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`payments_jazzcash_countries\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payments\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payments_jazzcash_countries_order_idx\` ON \`payments_jazzcash_countries\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payments_jazzcash_countries_parent_idx\` ON \`payments_jazzcash_countries\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`payments_paypro_countries\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payments\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payments_paypro_countries_order_idx\` ON \`payments_paypro_countries\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payments_paypro_countries_parent_idx\` ON \`payments_paypro_countries\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`payments\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`cod_enabled\` integer DEFAULT true,
  	\`cod_label\` text DEFAULT 'Cash on Delivery',
  	\`cod_note\` text DEFAULT 'Pay cash to the rider when your parcel arrives.',
  	\`easypaisa_enabled\` integer DEFAULT true,
  	\`easypaisa_label\` text DEFAULT 'Easypaisa',
  	\`easypaisa_account_number\` text DEFAULT '0300 0000000',
  	\`easypaisa_account_title\` text DEFAULT 'Kangan',
  	\`easypaisa_note\` text DEFAULT 'Send the total to our Easypaisa account, then enter the Transaction ID (TID) from your SMS.',
  	\`jazzcash_enabled\` integer DEFAULT true,
  	\`jazzcash_label\` text DEFAULT 'JazzCash',
  	\`jazzcash_account_number\` text DEFAULT '0300 0000000',
  	\`jazzcash_account_title\` text DEFAULT 'Kangan',
  	\`jazzcash_note\` text DEFAULT 'Send the total to our JazzCash account, then enter the Transaction ID (TID) from your SMS.',
  	\`paypro_enabled\` integer DEFAULT true,
  	\`paypro_label\` text DEFAULT 'PayPro (any bank app / card)',
  	\`paypro_note\` text DEFAULT 'We will send you a PayPro payment ID on WhatsApp — pay it from any bank app, ATM or wallet.',
  	\`delivery_fee_pakistan\` numeric DEFAULT 250,
  	\`delivery_fee_bahrain\` numeric DEFAULT 0,
  	\`delivery_free_over\` numeric DEFAULT 0,
  	\`delivery_cod_fee\` numeric DEFAULT 0,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`settings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`announcement\` text DEFAULT 'Door-to-door delivery across Pakistan & Bahrain',
  	\`whatsapp\` text DEFAULT '923000000000' NOT NULL,
  	\`phone\` text DEFAULT '+92 300 0000000',
  	\`email\` text DEFAULT 'info@kangan.com',
  	\`instagram\` text DEFAULT 'https://instagram.com/',
  	\`facebook\` text DEFAULT 'https://facebook.com/',
  	\`tiktok\` text DEFAULT 'https://tiktok.com/',
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`stats_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` numeric NOT NULL,
  	\`suffix\` text DEFAULT '+',
  	\`label\` text NOT NULL,
  	\`icon\` text DEFAULT 'heart',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`stats_items_order_idx\` ON \`stats_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`stats_items_parent_id_idx\` ON \`stats_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`stats\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`show\` integer DEFAULT true,
  	\`heading\` text DEFAULT 'Trusted by Women Across Pakistan & Bahrain',
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`orders\`;`)
  await db.run(sql`DROP TABLE \`products_details\`;`)
  await db.run(sql`DROP TABLE \`products\`;`)
  await db.run(sql`DROP TABLE \`products_rels\`;`)
  await db.run(sql`DROP TABLE \`categories_subcategories\`;`)
  await db.run(sql`DROP TABLE \`categories\`;`)
  await db.run(sql`DROP TABLE \`slides\`;`)
  await db.run(sql`DROP TABLE \`offers\`;`)
  await db.run(sql`DROP TABLE \`testimonials\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`DROP TABLE \`users_sessions\`;`)
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
  await db.run(sql`DROP TABLE \`payments_cod_countries\`;`)
  await db.run(sql`DROP TABLE \`payments_easypaisa_countries\`;`)
  await db.run(sql`DROP TABLE \`payments_jazzcash_countries\`;`)
  await db.run(sql`DROP TABLE \`payments_paypro_countries\`;`)
  await db.run(sql`DROP TABLE \`payments\`;`)
  await db.run(sql`DROP TABLE \`settings\`;`)
  await db.run(sql`DROP TABLE \`stats_items\`;`)
  await db.run(sql`DROP TABLE \`stats\`;`)
}
