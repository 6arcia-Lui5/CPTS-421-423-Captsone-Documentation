import { Link } from 'react-router';
import { SignInButton, SignUpButton, UserButton, useAuth, Show, SignOutButton, SignIn } from '@clerk/react';
import { MapIcon, DraftingCompassIcon, PlusIcon, UserIcon, Search } from 'lucide-react';

function Navbar() {
  const { isSignedIn } = useAuth();

  return <div className='navbar bg-base-300'>
          <div className='max-w-5xl mx-auto w-full px-4 flex justify-between items-center'>
            {/* LOGO - LEFT SIDE */}
            <div className='flex-1'>
              <Link to="/" className="btn btn-ghost gap-2">
                <DraftingCompassIcon className='size-5 text-primary'/>
                <span className='text-lg font-bold font-serif uppercase -tracking-tight'>The Artifact Site</span>
              </Link>
            </div>

            <div className='flex gap-2 items-center'>
              {isSignedIn ? (
                <>
                  <Link to="/search" className='btn btn-ghost btn-sm gap-1'>
                    <Search className='size-4'/>
                    <span className='hidden sm:inline'>Search</span>
                  </Link>
                  <Link to="/create" className='btn btn-primary btn-sm gap-1'>
                    <PlusIcon className='size-4'/>
                    <span className='hidden sm:inline'>New Record</span>
                  </Link>
                  <Link to="/profile" className='btn btn-ghost btn-sm gap-1'>
                    <UserIcon className='size-4'/>
                    <span className='hidden sm:inline'>Profile</span>
                  </Link>
                  <UserButton />
                </>
              ) : (
                <>
                  <SignInButton mode="modal">
                    <button className='btn btn-ghost btn-sm'>Sign In</button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className='btn btn-primary btn-sm'>Sign Up</button>
                  </SignUpButton>
                </>
              )}

            </div>
          </div>
      </div>
}

export default Navbar