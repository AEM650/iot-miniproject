import { NextResponse } from "next/server";
const {Client} = require("pg")
import dotenv from 'dotenv';

dotenv.config();
const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

client.connect();
export async function POST(req: Request) {
    try {
        const { ult_value, led} = await req.json();
        // Hash password
        const res = await client.query('INSERT INTO "opp003" (ult_value, led) VALUES ($1, $2) RETURNING *', [ult_value, led]);
        return new Response(JSON.stringify(res.rows[0]), {
            status: 201,
            headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
        });
    }
}

export async function GET(){
    try {
        const res = await client.query('SELECT * FROM "opp003" ORDER BY id DESC LIMIT 1');
        return new Response(JSON.stringify(res.rows), {
            status: 200,
            headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
        });
    }
}

export async function PUT(req: Request){
    try {
        const {led} = await req.json();
        const res = await client.query('UPDATE "opp003" SET led = $1 RETURNING *', [led]);
        return new Response(JSON.stringify(res.rows[0]), {
            status: 200,
            headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
        });
    }
}