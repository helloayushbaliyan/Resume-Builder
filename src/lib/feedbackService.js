import { supabase } from './supabase';

/**
 * Fetch approved feedbacks for display on website
 * @param {number} limit - Maximum number of feedbacks to fetch (default: 10)
 * @returns {Promise<Array>} Array of approved feedbacks
 */
export async function fetchApprovedFeedbacks(limit = 10) {
    try {
        const { data, error } = await supabase
            .from('feedbacks')
            .select('*')
            .eq('status', true)
            .order('created_at', { ascending: false })
            .limit(limit);

        if (error) {
            console.error('Error fetching approved feedbacks:', error);
            return [];
        }

        return data || [];
    } catch (err) {
        console.error('Error:', err);
        return [];
    }
}

/**
 * Fetch all feedbacks with specific rating
 * @param {number} rating - Rating value (1-5)
 * @param {number} limit - Maximum number to fetch
 * @returns {Promise<Array>} Array of feedbacks
 */
export async function fetchFeedbacksByRating(rating, limit = 10) {
    try {
        const { data, error } = await supabase
            .from('feedbacks')
            .select('*')
            .eq('status', true)
            .eq('rating', rating)
            .order('created_at', { ascending: false })
            .limit(limit);

        if (error) {
            console.error('Error fetching feedbacks by rating:', error);
            return [];
        }

        return data || [];
    } catch (err) {
        console.error('Error:', err);
        return [];
    }
}
