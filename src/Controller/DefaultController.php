<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Request\ParamFetcher;
use FOS\RestBundle\Request\ParamFetcherInterface;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use App\Entity\Contact;
use App\Service\ContactEmail;
use App\Entity\JobApplication;
use App\Service\Slugify;

class DefaultController extends AbstractController
{
    /**
     * @Route("/{reactRouting}", name="home", defaults={"reactRouting": null})
     */
    public function index(): Response
    {
        return $this->render('default/index.html.twig', [
            'controller_name' => 'DefaultController',
        ]);
    }

    /**
     * @Route("/api/contact", name="contact", methods={"POST"})
     */
    public function contact(ContactEmail $contactEmail): Response
    {
        $contact = new Contact();
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            if (!empty($_POST['contactName']) && !empty($_POST['contactEmail'])
                && !empty($_POST['contactSubject']) && !empty($_POST['contactMessage'])) {
                $contact->setName($_POST['contactName']);
                $contact->setEmail($_POST['contactEmail']);
                $contact->setSubject($_POST['contactSubject']);
                $contact->setMessage($_POST['contactMessage']);
                $em = $this->getDoctrine()->getManager();
                $em->persist($contact);
                $em->flush();

                $contactEmail->sendMailNewContact($contact);

                return new JsonResponse([
                    'success_message' => 'Thanks for contacting us'
                ]);
            } else {
                return new JsonResponse([
                    'error_message' => 'There is an error'
                ]);
            }
        }
    }

    /**
     * @Route("/api/apply", name="apply", methods={"POST"})
     */
    public function jobApply(Request $request, Slugify $slugify, ContactEmail $contactEmail): JsonResponse
    {
        $jobApplication = new JobApplication();
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            if (!empty($_POST['firstName']) && !empty($_POST['lastName']) && !empty($_POST['applyEmail'])
                && !empty($_POST['applyMessage'])) {
                $jobApplication->setFirstname($_POST['firstName']);
                $jobApplication->setLastname($_POST['lastName']);
                $jobApplication->setEmail($_POST['applyEmail']);
                $jobApplication->setMessage($_POST['applyMessage']);

                //$uploadedFile = ($paramFetcher->get('applyFile'));
                $uploadedFile = $request->files->get('applyFile');
                $destination = $this->getParameter('kernel.project_dir').'/public/uploads';
                $originalFilename = pathinfo($uploadedFile->getClientOriginalName(), PATHINFO_FILENAME);
                $newFilename = $slugify->generate($originalFilename).'-'.uniqid().'.'.$uploadedFile->guessExtension();
                $uploadedFile->move(
                    $destination,
                    $newFilename
                );

                $jobApplication->setResume($newFilename);

                $em = $this->getDoctrine()->getManager();
                $em->persist($jobApplication);
                $em->flush();

                $contactEmail->sendMailJobApplication($jobApplication, $newFilename);

                return new JsonResponse(
                    [
                        'success_message' => 'Thanks for applying'
                    ]
                );
            } else {
                return new JsonResponse([
                    'error_message' => 'There is an error'
                ]);
            }
        }

        /*return $this->render('contact/test.html.twig', [
            'test' => $test,
        ]);*/

        /*return $this->render('contact/job_application.html.twig', [
            'form' => $form->createView(),
        ]);*/
    }

    /**
     * @Route("/api/users", name="users")
     */
    public function getUsers()
    {
        $users = [
            [
                'id' => 1,
                'name' => 'Olususi Oluyemi',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
                'imageURL' => 'https://randomuser.me/api/portraits/women/50.jpg'
            ],
            [
                'id' => 2,
                'name' => 'Camila Terry',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
                'imageURL' => 'https://randomuser.me/api/portraits/men/42.jpg'
            ],
            [
                'id' => 3,
                'name' => 'Joel Williamson',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
                'imageURL' => 'https://randomuser.me/api/portraits/women/67.jpg'
            ],
            [
                'id' => 4,
                'name' => 'Deann Payne',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
                'imageURL' => 'https://randomuser.me/api/portraits/women/50.jpg'
            ],
            [
                'id' => 5,
                'name' => 'Donald Perkins',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
                'imageURL' => 'https://randomuser.me/api/portraits/men/89.jpg'
            ]
        ];

        $response = new Response();

        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');

        $response->setContent(json_encode($users));

        return $response;
    }
}
