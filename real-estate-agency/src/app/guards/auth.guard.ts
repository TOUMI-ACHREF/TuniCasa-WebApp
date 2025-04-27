import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { map, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.AuthenticatedUser$.pipe(
    take(1),
    map(user => {
      console.log('Guard: User=', user, 'Route data=', route.data); // Debug

      // Get roles from route.data, default to empty array
      const roles: string[] = route.data?.['roles'] || [];

      // If no roles specified, allow authenticated users
      if (!roles.length && user) {
        console.log('Guard: No roles specified, user authenticated');
        return true;
      }
      
      // Check if user is authenticated and has a matching role
      if (user && user.role?.name && roles.includes(user.role.name)) {
        console.log('Guard: Role match, access granted');
        console.log('here');
        return true;
      }
      console.log(user)
      // Redirect to /forbidden if authenticated but role doesn't match
       if (user) {
        console.log('Guard: Authenticated but role mismatch, redirecting to /forbidden');
        return router.createUrlTree(['/forbidden']);
      } 

      // Redirect to /login if not authenticated
      console.log('Guard: Not authenticated, redirecting to /login');
      return router.createUrlTree(['/login']);
    })
  );
};