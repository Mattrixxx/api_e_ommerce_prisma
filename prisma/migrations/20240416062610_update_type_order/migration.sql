/*
  Warnings:

  - You are about to drop the column `quintity` on the `order_products` table. All the data in the column will be lost.
  - Added the required column `quantity` to the `order_products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order_products` DROP COLUMN `quintity`,
    ADD COLUMN `quantity` INTEGER NOT NULL;
