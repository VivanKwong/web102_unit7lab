import { createClient } from '@supabase/supabase-js'
const URL = 'https://fvwanovxankpgzhnxibc.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2d2Fub3Z4YW5rcGd6aG54aWJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg1MTcwNDAsImV4cCI6MjAxNDA5MzA0MH0.vaW8DjNsrMF4gKs_EQD77COyb2cMMaLp9Zte13um_LQ';
export const supabase = createClient(URL, API_KEY);
