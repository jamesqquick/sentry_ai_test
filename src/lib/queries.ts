'use server';
import { NewSubscriberData } from '@/types/Types';
import { Status } from '@/types/Types';

import { getXataClient, DealsRecord, Subscribers } from '@/xata';
const xataClient = getXataClient();

// deal queries
export async function getAllDeals() {
  const deals: DealsRecord[] = await xataClient.db.deals
    .sort('xata.createdAt', 'desc')
    .getMany();

  return deals;
}

// subscriber queries
export async function createSubscriber(
  newSubscriberData: NewSubscriberData
): Promise<Subscribers> {
  const newSubscriber = await xataClient.db.subscribers.create(
    newSubscriberData
  );

  return newSubscriber;
}

export async function getOneSubscriberByToken(token: string) {
  const subscriber = await xataClient.db.subscribers
    .filter({
      token,
    })
    .getFirst();

  return subscriber;
}

export async function getOneSubscriberByEmail(email: string) {
  const subscriber = await xataClient.db.subscribers
    .filter({
      email,
    })
    .getFirst();

  return subscriber;
}
export async function getAllSubscribers(): Promise<Subscribers[]> {
  const subscribers = await xataClient.db.subscribers.getMany({});

  return subscribers;
}

export async function updateSubscriberToVerified(id: string) {
  const data = await xataClient.db.subscribers.update(id, {
    verified: true,
    status: Status.SUBSCRIBED,
  });

  return data;
}

export async function updateSubscriberPreferences(
  id: string,
  subscriberData: Subscribers
) {
  const {
    courseNotifications,
    ebookNotifications,
    miscNotifications,
    officeEquipmentNotifications,
    toolNotifications,
    conferenceNotifications,
  } = subscriberData;

  const isSubscribed =
    courseNotifications ||
    ebookNotifications ||
    miscNotifications ||
    officeEquipmentNotifications ||
    toolNotifications ||
    conferenceNotifications;

  const subscriber = {
    ...subscriberData,
    status: isSubscribed ? Status.SUBSCRIBED : Status.UNSUBSCRIBED,
  };

  await xataClient.db.subscribers.update(id, subscriber);
}

export async function deleteSubscriber(id: string) {
  const data = await xataClient.db.subscribers.delete(id);
}
