CREATE TABLE `messages` (
	`id` text PRIMARY KEY NOT NULL,
	`role` text NOT NULL,
	`assistant_id` text NOT NULL,
	`topic_id` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text,
	`status` text NOT NULL,
	`model_id` text,
	`model` text,
	`type` text,
	`useful` integer,
	`ask_id` text,
	`mentions` blob,
	`usage` blob,
	`metrics` blob,
	`multi_model_message_style` text,
	`fold_selected` integer,
	FOREIGN KEY (`topic_id`) REFERENCES `topics`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `messages_id_unique` ON `messages` (`id`);--> statement-breakpoint
CREATE INDEX `idx_messages_topic_id` ON `messages` (`topic_id`);--> statement-breakpoint
CREATE INDEX `idx_messages_assistant_id` ON `messages` (`assistant_id`);--> statement-breakpoint
ALTER TABLE `topics` ADD `messages` blob DEFAULT '[]' NOT NULL;--> statement-breakpoint
CREATE INDEX `idx_topics_assistant_id` ON `topics` (`assistant_id`);--> statement-breakpoint
CREATE INDEX `idx_message_blocks_message_id` ON `message_blocks` (`message_id`);