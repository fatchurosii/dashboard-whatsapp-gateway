<template>
    
    <div className="d-flex flex-column flex-root app-root" id="kt_app_root">
         <div className="app-page flex-column flex-column-fluid" id="kt_app_page">
            <Navbar />
            <div className="app-wrapper flex-column flex-row-fluid" id="kt_app_wrapper">
            <Sidebar />
            <div className="app-main flex-column flex-row-fluid" id="kt_app_main">
                <div className="d-flex flex-column flex-column-fluid">
                <div id="kt_app_content" className="app-content flex-column-fluid">
                    <div id="kt_app_content_container" className="app-container container-xxl">
                        <router-view></router-view>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>    
</div>

  
</template>
<script setup lang="ts">
    import {Navbar, Sidebar} from '@components/main';

</script>