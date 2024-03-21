'use server';
import { createSubscriber } from '@/lib/queries';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

const subscribeSchema = z.object({
  email: z.string().email(),
});

export const subscribe = async (formData: FormData) => {
  const token = uuidv4();

  // parse the email
  const parsed = subscribeSchema.parse({ email: formData.get('email') });
  const checkedEmail = parsed.email.toLowerCase();

  const newSubscriber = {
    email: checkedEmail,
    token: token,
    courseNotifications: true,
    ebookNotifications: true,
    miscNotifications: true,
    officeEquipmentNotifications: true,
    toolNotifications: true,
    conferenceNotifications: true,
  };

  // add new subscriber to the database
  await createSubscriber(newSubscriber);
};
