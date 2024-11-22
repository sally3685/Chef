'use client';
import { usePathname, useRouter } from 'next/navigation';
import { animateAuthOut } from '@/app/animation';
interface Props {
  href: string;
  label: string;
}
const TransportLink = ({ href, label }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const handleClick = () => {
    if (pathname !== href) {
      animateAuthOut(href, router);
    }
  };
  return <button onClick={handleClick}>{label}</button>;
};
export default TransportLink;
