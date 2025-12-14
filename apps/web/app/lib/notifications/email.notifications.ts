"use server";
import "server-only";
import { Resend } from "resend";
import { formatRsvpNotificationEmail } from "~/app/lib/notifications/email.formatters";
import { getPartyById, getRsvpDetailsByPartyId } from "~/app/lib/queries/rsvp.queries";

export async function sendRsvpNotificationEmail(partyId: string): Promise<void> {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.NOTIFICATION_FROM_EMAIL;
    const notificationEmails = process.env.NOTIFICATION_EMAILS;

    if (!apiKey || !fromEmail || !notificationEmails) {
      console.error("[Email Notification] Missing environment variables:", {
        hasApiKey: !!apiKey,
        hasFromEmail: !!fromEmail,
        hasNotificationEmails: !!notificationEmails,
      });
      return;
    }

    const recipients = notificationEmails.split(",").map((email) => email.trim());
    const [party, rsvpDetails] = await Promise.all([getPartyById(partyId), getRsvpDetailsByPartyId(partyId)]);

    if (!party) {
      console.error(`[Email Notification] Party not found: ${partyId}`);
      return;
    }

    const emailBody = formatRsvpNotificationEmail(party.displayName, rsvpDetails);
    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: fromEmail,
      to: recipients,
      subject: `New RSVP: ${party.displayName}`,
      text: emailBody,
    });

    console.log(`[Email Notification] Sent RSVP notification for party ${partyId}`);
  } catch (error) {
    console.error("[Email Notification] Failed to send RSVP notification:", error);
  }
}
