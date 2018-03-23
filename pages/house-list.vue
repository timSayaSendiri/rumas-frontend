<template>
  <v-layout wrap>
    <v-flex xs12 md12 sm12>
      <v-text-field
        label="Search"
        v-model="searchKeyword"
      ></v-text-field> 
    </v-flex>
    <v-flex xs12 pa-1 sm6 md3 v-for="(n, index) in 10" :key="index">
      <v-card>
        <v-card-media src="" height="200px">
        </v-card-media>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
            <div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="orange">Share</v-btn>
          <v-btn flat color="orange">Explore</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  data () {
    return {
      searchKeyword: ''
    }
  } 
}
</script>

