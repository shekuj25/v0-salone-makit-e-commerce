# Salone Makit - Test Accounts

Use these demo accounts to test the Salone Makit platform. All functionality is now working with the mock authentication system.

## Admin Account
- **Email**: admin@salone.com
- **Password**: admin123
- **Access**: Full admin dashboard with user, merchant, product, and order management

## Merchant Account
- **Email**: merchant@salone.com
- **Password**: merchant123
- **Access**: Merchant dashboard to add products, track views, and manage orders

## Buyer Account
- **Email**: buyer@salone.com
- **Password**: buyer123
- **Access**: Full shopping, checkout, and order tracking

## Key Features Now Working

✅ **Authentication**: Sign up and login now working with mock auth
✅ **Admin Dashboard**: Full access at `/admin` with statistics and management tools
✅ **Category Icons**: Replaced emojis with real product images
✅ **User Management**: All users stored in browser localStorage
✅ **Shopping**: Complete buy and checkout flow
✅ **Merchant Features**: Dashboard for sellers to manage products
✅ **Order Tracking**: Full order history and status updates

## To Transition to Real Supabase

When you're ready to use real Supabase authentication and database:

1. Add environment variables to your Vercel project:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

2. The system will automatically switch from mock auth to real Supabase

3. Update the database schema using the SQL scripts in `/scripts` folder

4. Run the migration scripts in your Supabase console
