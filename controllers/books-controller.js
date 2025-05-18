import { Book } from "../models/Book.js"

export const createBook = async (req, res) => {

    try {
        const {title, author,genere,publishedYear,status} = req.body 

        const book = await Book.create({
            title,
            author,
            genere,
            publishedYear, 
            status,
            createdAt:new Date()
        })
        res.status(201).json({  
            success: true, 
            message: "Book created successfully",
            data: book
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({  
            success: false, 
            message: "Book creation failed",
        });

        
    }

   

   



}





export const getAllbooks = async (req, res) => {
    try {
      const {
        status = "",
        sort = "",
        page = 1,
        limit = 10,
        search = ""
      } = req.query;
  
      const query = {};
  
      if (status) {
        query.status = status;
      }
  
      if (search) {
        query.title = { $regex: search, $options: 'i' };
      }
  
      let sortOption = {};
      if (sort === 'publishedYear' || sort === 'createdAt') {
        sortOption[sort] = -1;
      }
  
      const skip = (page - 1) * limit;
  
      const books = await Book.find(query)
        .sort(sortOption)
        .skip(skip)
        .limit(parseInt(limit));
  
      const total = await Book.countDocuments(query);
  
      res.json({
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        books,
      });
  
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Book fetch failed",
      });
    }
  };
  

export const getBookById = async (req, res) => {

    try {
        const {bookId} = req.params 

        const book  = await Book.findById(bookId)
    
        if(!book){
            res.status(500).json({  
                success: false, 
                message: "Book with id not found",
            });
    
        }

        res.status(200).json({  
            success: true, 
            message: "Book with id found",
            data:book
        });

        
        
    } catch (error) {
        res.status(500).json({  
            success: false, 
            message: "Book with id not found",
        });
        
    }
   
}

export const editBookById = async (req, res) => {
    try {
        const {bookId} = req.params 
        const {title, author,genere,publishedYear,status} = req.body 

        
        const book  = await Book.findById(bookId)

        
    
        if(!book){
            res.status(500).json({  
                success: false, 
                message: "Book with id not found",
            });
    
        }

        const updatedBook  = await Book.findByIdAndUpdate(bookId, {
            title, 
            author,
            genere,
            publishedYear,
            status,



        }, {new:true})

        res.status(200).json({  
            success: true, 
            message: "Book with id found",
            data:updatedBook
        });

        
        
    } catch (error) {
        res.status(500).json({  
            success: false, 
            message: "Book with id not found",
        });
        
    }
    

}

export const deleteBook = async (req, res) => {
    try {

        const {bookId} = req.params 

        const book  = await Book.findById(bookId)

        
    
        if(!book){
            res.status(500).json({  
                success: false, 
                message: "Book with id not found",
            });
    
        }

        const deletedBook = await Book.findByIdAndDelete(bookId)

        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: deleteBook, 
        });
        
        
    } catch (error) {
        res.status(500).json({  
            success: false, 
            message: "Book not deleted",
        });
        
    }
}