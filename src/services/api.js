import axios from "axios";

const apiUrl = 'https://suitmedia-backend.suitdev.com/api/ideas';

const fetchIdeas = async ({ pageNumber, pageSize, sorting}) => {
    try {
        const response = await axios.get(apiUrl, {
          params: {
            'page[number]': pageNumber,
            'page[size]': pageSize,
            append: ['small_image', 'medium_image'],
            sort: sorting
          }
        });
    
        return response.data.data;
        
    } catch (error) {
        throw new Error('Error fetching ideas:', error);
    }
};

export {fetchIdeas}