import { Request, Response } from 'express';
import { supabase } from '../lib/supabase';

export const getUsers = async (req: Request, res: Response) => {
    try {
        const { data, error } = await supabase
            .from('users')
            .select('*');

        if (error) {
            return res.status(500).json({ success: false, error: error.message });
        }

        res.json({ success: true, data });
    } catch (err: any) {
        res.status(500).json({ success: false, error: err.message });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const { email, name } = req.body;

        if (!email || !name) {
            return res.status(400).json({ success: false, error: "Email and Name are required" });
        }

        const { data, error } = await supabase
            .from('users')
            .insert([{ email, name }])
            .select();

        if (error) {
            return res.status(500).json({ success: false, error: error.message });
        }

        res.status(201).json({ success: true, data: data[0] });
    } catch (err: any) {
        res.status(500).json({ success: false, error: err.message });
    }
};
