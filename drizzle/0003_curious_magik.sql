CREATE TABLE `assistants` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`prompt` text NOT NULL,
	`knowledge_ids` text,
	`type` text NOT NULL,
	`emoji` text,
	`description` text,
	`model` blob,
	`default_model` blob,
	`settings` blob,
	`enable_web_search` integer,
	`websearch_provider_id` text,
	`enable_generate_image` integer,
	`mcp_servers` blob,
	`knowledge_recognition` text,
	`tags` text,
	`groups` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `assistants_id_unique` ON `assistants` (`id`);--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_messages` (
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
	FOREIGN KEY (`assistant_id`) REFERENCES `assistants`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`topic_id`) REFERENCES `topics`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_messages`("id", "role", "assistant_id", "topic_id", "created_at", "updated_at", "status", "model_id", "model", "type", "useful", "ask_id", "mentions", "usage", "metrics", "multi_model_message_style", "fold_selected") SELECT "id", "role", "assistant_id", "topic_id", "created_at", "updated_at", "status", "model_id", "model", "type", "useful", "ask_id", "mentions", "usage", "metrics", "multi_model_message_style", "fold_selected" FROM `messages`;--> statement-breakpoint
DROP TABLE `messages`;--> statement-breakpoint
ALTER TABLE `__new_messages` RENAME TO `messages`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `messages_id_unique` ON `messages` (`id`);--> statement-breakpoint
CREATE INDEX `idx_messages_topic_id` ON `messages` (`topic_id`);--> statement-breakpoint
CREATE INDEX `idx_messages_assistant_id` ON `messages` (`assistant_id`);--> statement-breakpoint
CREATE TABLE `__new_topics` (
	`id` text PRIMARY KEY NOT NULL,
	`assistant_id` text NOT NULL,
	`name` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	`messages` blob DEFAULT '[]' NOT NULL,
	`pinned` integer,
	`prompt` text,
	`isNameManuallyEdited` integer,
	FOREIGN KEY (`assistant_id`) REFERENCES `assistants`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_topics`("id", "assistant_id", "name", "created_at", "updated_at", "messages", "pinned", "prompt", "isNameManuallyEdited") SELECT "id", "assistant_id", "name", "created_at", "updated_at", "messages", "pinned", "prompt", "isNameManuallyEdited" FROM `topics`;--> statement-breakpoint
DROP TABLE `topics`;--> statement-breakpoint
ALTER TABLE `__new_topics` RENAME TO `topics`;--> statement-breakpoint
CREATE UNIQUE INDEX `topics_id_unique` ON `topics` (`id`);--> statement-breakpoint
CREATE INDEX `idx_topics_assistant_id` ON `topics` (`assistant_id`);