import MasterBrand from "@src/views/master/brand/Index.vue"
import MasterCategory from "@src/views/master/category/Index.vue"
let routes = [
    {
        path: '/master',
        children:[
            {
                path: 'brand',      
                name: 'master-brand',
                component: MasterBrand
            },   
            {
                path: 'category',    
                name: 'master-category',            
                component: MasterCategory
            },          
        ]

    }    
]

export default routes