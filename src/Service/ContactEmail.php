<?php

namespace App\Service;

use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mailer\MailerInterface;

class ContactEmail
{
    private $mailer;

    public function __construct(MailerInterface $mailer)
    {
        $this->mailer = $mailer;
    }

    public function sendMailNewContact($contact)
    {
        $newEmail = new TemplatedEmail();
        $newEmail
            ->from('d5723b0139-e2ef70@inbox.mailtrap.io')
            ->to('anais.mailtest@gmail.com')
            ->subject('New Message from 1st Symfony-React')
            ->htmlTemplate('contact/email/new_contact.html.twig')
            ->context([
                'contact' => $contact
            ]);
        $this->mailer->send($newEmail);
    }

    public function sendMailJobApplication($jobApplication, $newFileName)
    {
        $newEmail = new TemplatedEmail();
        $newEmail
            ->from('d5723b0139-e2ef70@inbox.mailtrap.io')
            ->to('anais.mailtest@gmail.com')
            ->subject('New Job Application from 1st Symfony-React')
            ->attachFromPath('../public/uploads/'. $newFileName)
            ->htmlTemplate('contact/email/new_job_application.html.twig')
            ->context([
                'contact' => $jobApplication
            ]);
        $this->mailer->send($newEmail);
    }
}