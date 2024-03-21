'use client';
import { subscribe } from '../actions/subscribe';
import SubscribeFormButton from './SubscribeFormButton';
import toast from 'react-hot-toast';

export default function SubscribeForm() {
  return (
    <form
      id="subscribe-form"
      action={async (formData) => {
        await subscribe(formData);

        const form = document.getElementById(
          'subscribe-form'
        ) as HTMLFormElement;
        form.reset();

        // route subscriber to confirm page
        toast.success('You are subscirbed');
      }}
    >
      <div className="relative h-[44.36px] w-[303px] md:h-[70px] md:w-[476px]">
        <input
          type="email"
          name="email"
          placeholder="E-mail address"
          className="w-full rounded-md border border-white/[.67] bg-transparent p-3 pl-4  text-white md:h-[70px] md:w-[476px] md:rounded-[16px] md:placeholder:text-white/[.47]"
        />
        <SubscribeFormButton />
      </div>
    </form>
  );
}
