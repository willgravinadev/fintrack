-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('TRANSFER_OUT', 'TRANSFER_IN', 'STOCK_PURCHASE', 'STOCK_SALE', 'STOCK_DIVIDEND');

-- CreateTable
CREATE TABLE "users" (
    "email" VARCHAR(256) NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "password_hash" VARCHAR(256),
    "avatar_url" VARCHAR(256),
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "deleted_at" TIMESTAMPTZ,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "google_accounts" (
    "google_account_id" VARCHAR(256) NOT NULL,
    "avatar_url" VARCHAR(256),
    "name" VARCHAR(256) NOT NULL,
    "email" VARCHAR(256) NOT NULL,
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "deleted_at" TIMESTAMPTZ,

    CONSTRAINT "google_accounts_pkey" PRIMARY KEY ("user_id","google_account_id")
);

-- CreateTable
CREATE TABLE "currencies" (
    "symbol" VARCHAR(10) NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "deleted_at" TIMESTAMPTZ,

    CONSTRAINT "currencies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wallets" (
    "name" VARCHAR(64) NOT NULL,
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "deleted_at" TIMESTAMPTZ,
    "owner_id" UUID NOT NULL,

    CONSTRAINT "wallets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wallet_participants" (
    "participant_id" UUID NOT NULL,
    "wallet_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "deleted_at" TIMESTAMPTZ,

    CONSTRAINT "wallet_participants_pkey" PRIMARY KEY ("wallet_id","participant_id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "name" VARCHAR(64) NOT NULL,
    "amount_in_cents" INTEGER NOT NULL,
    "currency_symbol" VARCHAR(10) NOT NULL,
    "transaction_type" "TransactionType" NOT NULL,
    "description" TEXT,
    "from_wallet_id" UUID,
    "to_wallet_id" UUID,
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "deleted_at" TIMESTAMPTZ,
    "user_id" UUID NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock_in_wallets" (
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
    "purchased_by_user_id" UUID NOT NULL,

    CONSTRAINT "stock_in_wallets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stocks" (
    "symbol" VARCHAR(10) NOT NULL,
    "shortName" VARCHAR(99) NOT NULL,
    "longName" VARCHAR(256) NOT NULL,
    "logo_url" VARCHAR(256),
    "exchange_id" UUID NOT NULL,
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "deleted_at" TIMESTAMPTZ,

    CONSTRAINT "stocks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exchanges" (
    "shortName" VARCHAR(256) NOT NULL,
    "longName" VARCHAR(256) NOT NULL,
    "symbol" VARCHAR(10) NOT NULL,
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "deleted_at" TIMESTAMPTZ,

    CONSTRAINT "exchanges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock_price_logs" (
    "date" TIMESTAMPTZ NOT NULL,
    "open_price_in_cents" INTEGER NOT NULL,
    "high_price_in_cents" INTEGER NOT NULL,
    "low_price_in_cents" INTEGER NOT NULL,
    "close_price_in_cents" INTEGER NOT NULL,
    "volume" INTEGER NOT NULL,
    "adjusted_close_price_in_cents" INTEGER,
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "deleted_at" TIMESTAMPTZ,
    "stock_id" UUID NOT NULL,

    CONSTRAINT "stock_price_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stocks_to_watch" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "deleted_at" TIMESTAMPTZ,
    "stock_id" UUID NOT NULL,

    CONSTRAINT "stocks_to_watch_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_name_idx" ON "users"("name");

-- CreateIndex
CREATE INDEX "users_email_deleted_at_idx" ON "users"("email", "deleted_at");

-- CreateIndex
CREATE UNIQUE INDEX "google_accounts_google_account_id_key" ON "google_accounts"("google_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "google_accounts_email_key" ON "google_accounts"("email");

-- CreateIndex
CREATE UNIQUE INDEX "google_accounts_user_id_key" ON "google_accounts"("user_id");

-- CreateIndex
CREATE INDEX "google_accounts_email_idx" ON "google_accounts"("email");

-- CreateIndex
CREATE UNIQUE INDEX "currencies_symbol_key" ON "currencies"("symbol");

-- CreateIndex
CREATE INDEX "wallets_name_idx" ON "wallets"("name");

-- CreateIndex
CREATE INDEX "wallets_owner_id_idx" ON "wallets"("owner_id");

-- CreateIndex
CREATE INDEX "wallet_participants_participant_id_idx" ON "wallet_participants"("participant_id");

-- CreateIndex
CREATE INDEX "transactions_user_id_idx" ON "transactions"("user_id");

-- CreateIndex
CREATE INDEX "transactions_from_wallet_id_idx" ON "transactions"("from_wallet_id");

-- CreateIndex
CREATE INDEX "transactions_to_wallet_id_idx" ON "transactions"("to_wallet_id");

-- CreateIndex
CREATE INDEX "transactions_transaction_type_idx" ON "transactions"("transaction_type");

-- CreateIndex
CREATE INDEX "transactions_created_at_idx" ON "transactions"("created_at");

-- CreateIndex
CREATE INDEX "stock_in_wallets_stock_id_idx" ON "stock_in_wallets"("stock_id");

-- CreateIndex
CREATE INDEX "stock_in_wallets_wallet_id_idx" ON "stock_in_wallets"("wallet_id");

-- CreateIndex
CREATE INDEX "stocks_symbol_idx" ON "stocks"("symbol");

-- CreateIndex
CREATE UNIQUE INDEX "stocks_symbol_exchange_id_key" ON "stocks"("symbol", "exchange_id");

-- CreateIndex
CREATE UNIQUE INDEX "exchanges_symbol_key" ON "exchanges"("symbol");

-- CreateIndex
CREATE INDEX "exchanges_symbol_idx" ON "exchanges"("symbol");

-- CreateIndex
CREATE INDEX "stock_price_logs_date_idx" ON "stock_price_logs"("date");

-- CreateIndex
CREATE INDEX "stocks_to_watch_stock_id_idx" ON "stocks_to_watch"("stock_id");

-- AddForeignKey
ALTER TABLE "google_accounts" ADD CONSTRAINT "google_accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wallets" ADD CONSTRAINT "wallets_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wallet_participants" ADD CONSTRAINT "wallet_participants_participant_id_fkey" FOREIGN KEY ("participant_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wallet_participants" ADD CONSTRAINT "wallet_participants_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "wallets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_from_wallet_id_fkey" FOREIGN KEY ("from_wallet_id") REFERENCES "wallets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_to_wallet_id_fkey" FOREIGN KEY ("to_wallet_id") REFERENCES "wallets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_in_wallets" ADD CONSTRAINT "stock_in_wallets_stock_id_fkey" FOREIGN KEY ("stock_id") REFERENCES "stocks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_in_wallets" ADD CONSTRAINT "stock_in_wallets_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "wallets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_in_wallets" ADD CONSTRAINT "stock_in_wallets_purchased_by_user_id_fkey" FOREIGN KEY ("purchased_by_user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stocks" ADD CONSTRAINT "stocks_exchange_id_fkey" FOREIGN KEY ("exchange_id") REFERENCES "exchanges"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_price_logs" ADD CONSTRAINT "stock_price_logs_stock_id_fkey" FOREIGN KEY ("stock_id") REFERENCES "stocks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stocks_to_watch" ADD CONSTRAINT "stocks_to_watch_stock_id_fkey" FOREIGN KEY ("stock_id") REFERENCES "stocks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
