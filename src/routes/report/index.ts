import ReportBrand from "@src/views/report/brand/Index.vue"
import ReportCategory from "@src/views/report/category/Index.vue"
let routes = [
    {
        path: '/report',
        children:[
            {
                path: 'brand',                
                component: ReportBrand
            },   
            {
                path: 'category',                
                component: ReportCategory
            },          
        ]

    }    
]

export default routes