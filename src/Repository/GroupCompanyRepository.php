<?php

namespace App\Repository;

use App\Entity\GroupCompany;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method GroupCompany|null find($id, $lockMode = null, $lockVersion = null)
 * @method GroupCompany|null findOneBy(array $criteria, array $orderBy = null)
 * @method GroupCompany[]    findAll()
 * @method GroupCompany[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class GroupCompanyRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, GroupCompany::class);
    }

    // /**
    //  * @return GroupCompany[] Returns an array of GroupCompany objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('g')
            ->andWhere('g.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('g.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?GroupCompany
    {
        return $this->createQueryBuilder('g')
            ->andWhere('g.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
