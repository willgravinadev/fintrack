/*
  Warnings:

  - You are about to drop the `stock_in_wallets` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "stock_in_wallets" DROP CONSTRAINT "stock_in_wallets_purchased_by_user_id_fkey";

-- DropForeignKey
ALTER TABLE "stock_in_wallets" DROP CONSTRAINT "stock_in_wallets_stock_id_fkey";

-- DropForeignKey
ALTER TABLE "stock_in_wallets" DROP CONSTRAINT "stock_in_wallets_wallet_id_fkey";

-- DropTable
DROP TABLE "stock_in_wallets";

-- CreateTable
CREATE TABLE "stock_transactions" (
    "purchase_price_in_cents" INTEGER NOT NULL,
    "purchase_at" TIMESTAMPTZ NOT NULL,
    "sale_price_in_cents" INTEGER,
    "sale_at" TIMESTAMPTZ,
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "deleted_at" TIMESTAMPTZ,
    "stock_id" UUID NOT NULL,
    "wallet_id" UUID NOT NULL,
    "investor_id" UUID NOT NULL,

    CONSTRAINT "stock_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "stock_transactions_stock_id_idx" ON "stock_transactions"("stock_id");

-- CreateIndex
CREATE INDEX "stock_transactions_wallet_id_idx" ON "stock_transactions"("wallet_id");

-- AddForeignKey
ALTER TABLE "stock_transactions" ADD CONSTRAINT "stock_transactions_stock_id_fkey" FOREIGN KEY ("stock_id") REFERENCES "stocks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_transactions" ADD CONSTRAINT "stock_transactions_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "wallets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_transactions" ADD CONSTRAINT "stock_transactions_investor_id_fkey" FOREIGN KEY ("investor_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
