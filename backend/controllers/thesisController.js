const Thesis = require('../models/thesisModel')

// Filter, sorting and paginating

//
//PWEDENG COMMENT MUNA TO HEHE PANG SORT LNG ITO 
//

// class APIfeatures {
//     constructor(query, queryString){
//         this.query = query;
//         this.queryString = queryString;
//     }
//     filtering(){
//        const queryObj = {...this.queryString} //queryString = req.query

//        const excludedFields = ['page', 'sort', 'limit']
//        excludedFields.forEach(el => delete(queryObj[el]))
       
//        let queryStr = JSON.stringify(queryObj)
//        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

//     //    gte = greater than or equal
//     //    lte = lesser than or equal
//     //    lt = lesser than
//     //    gt = greater than
//        this.query.find(JSON.parse(queryStr))
         
//        return this;
//     }

//     sorting(){
//         if(this.queryString.sort){
//             const sortBy = this.queryString.sort.split(',').join(' ')
//             this.query = this.query.sort(sortBy)
//         }else{
//             this.query = this.query.sort('-createdAt')
//         }

//         return this;
//     }

//     paginating(){
//         const page = this.queryString.page * 1 || 1
//         const limit = this.queryString.limit * 1 || 9
//         const skip = (page - 1) * limit;
//         this.query = this.query.skip(skip).limit(limit)
//         return this;
//     }
// }

const thesisController = {
    getThesis: async(req, res) =>{
        try {
            // const features = new APIfeatures(Thesis.find(), req.query)
            // .filtering().sorting().paginating()

            // const thesis = await features.query

            res.json({
                status: 'success',
                result: Thesis.length,
                Thesis: Thesis
            })

            // res.json('test')
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createThesis: async(req, res) =>{
        try {
            const {title, publishedAt, author, keywords, abstract, upload, department,price} = req.body;
            if(!upload) return res.status(400).json({msg: "No file uploaded"})

            const thesis = await Thesis.findOne({title})
            if(thesis)
                return res.status(400).json({msg: "This thesis already exists."})

            const newThesis = new Thesis({
                 title: title.toLowerCase(), publishedAt, author, keywords, abstract,upload, department,price
            })

            await newThesis.save()
            res.json({msg: "Created a Thesis"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteThesis: async(req, res) =>{
        try {
            await Thesis.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted a Thesis"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateThesis: async(req, res) =>{
        try {
            const {title, publishedAt, author, keywords, abstract, upload, department,price} = req.body;
            if(!upload) return res.status(400).json({msg: "No file uploaded"})

            await Thesis.findOneAndUpdate({_id: req.params.id}, {
                title: title.toLowerCase(), publishedAt, author, keywords, abstract,upload, department,price
            })

            res.json({msg: "Updated a Thesis"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = thesisController