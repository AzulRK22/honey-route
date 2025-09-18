// frontend/src/app/page.tsx
import { redirect } from 'next/navigation';

export default function Root() {
  // Siempre mostramos Onboarding primero
  redirect('/onboarding');
}
