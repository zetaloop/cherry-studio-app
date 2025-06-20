CREATE TABLE `message_blocks` (
	`id` text PRIMARY KEY NOT NULL,
	`message_id` text NOT NULL,
	`type` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text,
	`status` text NOT NULL,
	`model` blob,
	`metadata` blob,
	`error` blob,
	`content` text,
	`language` text,
	`url` text,
	`file` blob,
	`tool_id` text,
	`tool_name` text,
	`arguments` blob,
	`source_block_id` text,
	`source_language` text,
	`target_language` text,
	`response` blob,
	`knowledge` blob,
	`thinking_millsec` integer,
	`knowledge_base_ids` blob,
	`citation_references` blob
);
--> statement-breakpoint
CREATE UNIQUE INDEX `message_blocks_id_unique` ON `message_blocks` (`id`);