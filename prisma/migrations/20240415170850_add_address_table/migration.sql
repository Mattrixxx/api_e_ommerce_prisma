/*
  Warnings:

  - Added the required column `city` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lineOne` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pincode` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `addresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `addresses` ADD COLUMN `city` VARCHAR(191) NOT NULL,
    ADD COLUMN `country` VARCHAR(191) NOT NULL,
    ADD COLUMN `lineOne` VARCHAR(191) NOT NULL,
    ADD COLUMN `lineTwo` VARCHAR(191) NULL,
    ADD COLUMN `pincode` VARCHAR(191) NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `addresses` ADD CONSTRAINT `addresses_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
