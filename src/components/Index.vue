<template>
    <div class="index container">
      <div v-if="loading" class="loader">
        <img src="@/assets/Dual-ball.svg" alt="dual ball">
      </div>
      <div class="ifnosmoothies" v-if="!smoothies">
        Click the plus icon at the top right to add smoothies...
      </div>
        <div class="card" v-for="smoothie in smoothies" :key="smoothie.id">
          <div class="content">
            <i class="material-icons delete" @click="deleteSmoothie(smoothie.id)" >delete</i>
            <h2 class="indigo-text">{{ smoothie.title }}</h2>
            <ul class="ingredients">
              <li v-for="(ing, index) in smoothie.ingredients" :key="index">
                <span class="chip">{{ ing }}</span>
              </li>
            </ul>
          </div>
          <span class="btn-floating btn-large halfway-fab pink">
            <router-link :to="{ name: 'EditSmoothie', params: { smoothie_slug: smoothie.slug } }">
              <i class="material-icons edit">edit</i>
            </router-link>
          </span>
        </div>
    </div>
</template>

<script>
import db from '@/firebase/init';

export default {
  name: 'Index',
  data() {
    return {
      smoothies: [],
      loading: true,
    };
  },
  methods: {
    deleteSmoothie(id) {
      this.loading = true;
      db.collection('smoothies').doc(id).delete()
        .then(() => {
          this.smoothies = this.smoothies.filter((smoothie) => smoothie.id !== id);
          this.loading = false;
        });
    },
  },
  created() {
    // fetch data from firestore
    db.collection('smoothies').get()
      .then((snapshot) => {
        this.loading = false;
        snapshot.forEach((doc) => {
          const smoothie = doc.data();
          smoothie.id = doc.id;
          this.smoothies.push(smoothie);
          console.log(this.smoothies);
        });
      });
  },
};
</script>

<style lang="scss">
div.index {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  margin-top: 60px;
  .ifnosmoothies {
    grid-column: 1/4;
    text-align: center;
    font-size: 14px;
    color: rgb(36, 36, 36);
  }
  .loader {
    grid-column: 1/4;
    margin: 0 auto;
    margin-top: -59px;
    width: 90px;
    height: 70px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  h2 {
    font-size: 1.8em;
    text-align: center;
    margin-top: 0;
  }
  .content {
    .ingredients {
    margin: 30px auto;
    display: flex;
    justify-content: left;
    align-items: center;
    }
    ul {
      span {
        display: flex;
        align-items: center;
        padding: 10px;
      }
    }
    .delete {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      top: -20px;
      width: 40px;
      height: 40px;
      padding: 10px;
      border-radius: 40px;
      right: -20px;
      background: #E91E62;
      color: #fff;
      box-sizing: border-box;
      cursor: pointer;
      box-shadow: 0px 1px 3px rgba(0,0,0, .5);
    }
  }
  .card {
  padding: 20px;
  }
}
</style>
