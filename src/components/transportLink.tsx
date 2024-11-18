'use client';
import { usePathname, useRouter } from 'next/navigation';
import { animatePageOut } from '@/app/animation';
interface Props {
  href: string;
  label: string;
}
const TransportLink = ({ href, label }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const handleClick = () => {
    if (pathname !== href) {
      animatePageOut(href, router);
    }
  };
  return <button onClick={handleClick}>{label}</button>;
};
export default TransportLink;
