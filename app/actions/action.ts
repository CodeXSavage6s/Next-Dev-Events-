'use server';

import { query } from '@/lib/db';

export async function getBookingCountByEventId(id: string): Promise<number> {
  const { rows } = await query(
    'SELECT COUNT(*) as count FROM bookings WHERE event_id = $1',
    [id]
  );

  return parseInt(rows[0].count, 10);
}

export async function getSimilarEvents(tags: string[], id: string) {
  const { rows } = await query(
    `SELECT * FROM events 
     WHERE tags ?| $1::text[]
     AND id != $2
     LIMIT 3`,
    [tags, id]
  );

  //return rows;
  return rows.map((row) => ({
    ...row,
    date: row.date instanceof Date ? row.date.toISOString().split('T')[0] : row.date,
  }));
}