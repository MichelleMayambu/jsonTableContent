<template>
  <div>
    <lottie-vue-player :src="`https://assets2.lottiefiles.com/packages/lf20_verkcp5o.json`"
                           :theme="options.theme"
                           :player-size="options.playerSize"
                           :player-controls="true"
                           :autoplay ="true"
                           :loop="true"
                           style="width: 100%; height:200px">
        </lottie-vue-player>
    <Bikes/>
  </div>
</template>

<script>
import Bikes from "~/components/Bikes"
export default {
  components:{
    Bikes
  },
  data() {
    return{
      options: {
                    minimizable: false,
                    playerSize: "standard",
                    backgroundColor: '#fff',
                    backgroundStyle: 'color',
                    theme: {
                        controlsView: "standard",
                        active: "light",
                        light: {
                            color: '#3D4852',
                            backgroundColor: '#fff',
                            opacity: '0.7',
                        },
                        dark: {
                            color: '#fff',
                            backgroundColor: '#202020',
                            opacity: '0.7',
                        }
                    }
                },
      bikes: null,
    }   
  }
}
</script>