import { sql, type Kysely } from 'kysely';

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('users')
    .addColumn('id', 'text', (col) => col.primaryKey().notNull().unique())
    .addColumn('createdAt', 'timestamptz', (col) => col.defaultTo(Date.now()))
    .addColumn('updatedAt', 'timestamptz', (col) => col.defaultTo(Date.now()))
    .addColumn('email', 'text', (col) => col.notNull().unique())
    .addColumn('token', 'text', (col) => col.notNull().unique())
    .addColumn('username', 'text', (col) => col.notNull().unique())
    .addColumn('password', 'text', (col) => col.notNull())
    .addColumn('bio', 'text')
    .addColumn('prefs', 'json')
    .addColumn('image', 'text', (col) =>
      col.defaultTo(
        'https://images.unsplash.com/vector-1744035321374-a3bd0eb41df3?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      ),
    )
    .addColumn('session', 'text', (col) => col.unique())
    .addColumn('sessionId', 'text', (col) => col.unique())
    .execute();

  await db.schema
    .createTable('sessions')
    .addColumn('id', 'text', (col) => col.primaryKey().notNull().unique())
    .addColumn('token', 'text', (col) => col.notNull().unique())
    .addColumn('createdAt', 'timestamptz', (col) => col.defaultTo(Date.now()))
    .addColumn('updatedAt', 'timestamptz', (col) => col.defaultTo(Date.now()))
    .addColumn('userId', 'text', (col) => col.notNull())
    .addColumn('expire', 'timestamptz', (col) => col.notNull())
    .addColumn('ip', 'text')
    .execute();

  await db.schema
    .createTable('articles')
    .addColumn('slug', 'text', (col) => col.primaryKey().unique())
    .addColumn('title', 'text', (col) => col.notNull())
    .addColumn('description', 'text', (col) => col.notNull())
    .addColumn('body', 'text', (col) => col.notNull())
    .addColumn('tagList', sql`text[]`)
    .addColumn('createdAt', 'timestamptz', (col) => col.defaultTo(Date.now()))
    .addColumn('updatedAt', 'timestamptz', (col) => col.defaultTo(Date.now()))
    .addColumn('favorited', 'boolean', (col) => col.defaultTo(false))
    .addColumn('favoritesCount', 'bigint', (col) => col.defaultTo(0))
    .addColumn('author', 'text', (col) => col.notNull())
    .execute();

  await db.schema
    .createTable('comments')
    .addColumn('id', 'text', (col) => col.primaryKey().notNull().unique())
    .addColumn('createdAt', 'timestamptz', (col) => col.defaultTo(Date.now()))
    .addColumn('updatedAt', 'timestamptz', (col) => col.defaultTo(Date.now()))
    .addColumn('body', 'text', (col) => col.notNull())
    .addColumn('author', 'text', (col) => col.notNull())
    .execute();

  await db.schema
    .createTable('tags')
    .addColumn('tag', 'text', (col) => col.notNull())
    .execute();
}

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('users').execute();
  await db.schema.dropTable('sessions').execute();
  await db.schema.dropTable('articles').execute();
  await db.schema.dropTable('comments').execute();
  await db.schema.dropTable('tags').execute();
}
