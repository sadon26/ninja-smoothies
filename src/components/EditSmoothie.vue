<template>
  <div>
      <div v-if="loading" class="loader">
        <img src="@/assets/Dual-ball.svg" alt="dual ball">
      </div>
    <div class="edit-smoothie container" v-if="smoothie">
      <div class="edit-smoothie">
        <p>Edit smoothie {{ smoothie.title }}</p>
      </div>
      <form @submit.prevent="editSmoothie">
        <div class="field">
          <label for="title">Smoothie Title</label>
          <input type="text" name='title' v-model='smoothie.title'>
        </div>
        <div class="field" v-for="(ing, index) in smoothie.ingredients" :key="index">
          <label for="ingredient">Ingredient:</label>
          <input type="text" name="ingredient" v-model="smoothie.ingredients[index]">
          <i class="material-icons delete" @click="deleteIng(ing)" >delete</i>
        </div>
        <div class="field add-ingredient">
          <label for="add-ingredient">Press tab to add ingredient</label>
          <input type="text" name='add-ingredient' @keydown.tab.prevent="addIng" v-model="another">
        </div>
        <div class="field center-align">
          <p v-if="feedback" class="red-text">{{ feedback }}</p>
          <button class="btn pink">Update Smoothie</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init';
import slugify from 'slugify';

export default {
  name: 'EditSmoothie',
  data() {
    return {
      smoothie: null,
      another: null,
      feedback: null,
      loading: true,
    };
  },
  methods: {
    editSmoothie() {
      console.log(this.smoothie.title, this.smoothie.ingredients);
      if (this.smoothie.title) {
        this.feeback = null;
        this.smoothie.slug = slugify(this.smoothie.title, {
          replacement: '-',
          remove: /[$*!_+~.()'"\-:@]/g,
          lower: true,
        });
        db.collection('smoothies').doc(this.smoothie.id).update({
          title: this.smoothie.title,
          ingredients: this.smoothie.ingredients,
          slug: this.smoothie.slug,
        }).then(() => {
          this.$router.push({ name: 'Index' });
        })
          .catch((err) => console.log(err));
      } else {
        this.feedback = 'You must enter a smoothie title';
      }
    },
    addIng() {
      if (this.another) {
        this.smoothie.ingredients.push(this.another);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = 'You must enter a value to add an ingredient';
      }
    },
    deleteIng(ing) {
      this.smoothie.ingredients = this.smoothie.ingredients.filter((i) => i !== ing);
    },
  },
  created() {
    const ref = db.collection('smoothies').where('slug', '==', this.$route.params.smoothie_slug);
    ref.get()
      .then((snapshot) => {
        this.loading = false;
        snapshot.forEach((doc) => {
          this.smoothie = doc.data();
          this.smoothie.id = doc.id;
          console.log(doc.data());
          console.log(this.smoothie);
        });
      });
  },
};
</script>

<style lang="scss">
div {
    .loader {
    grid-column: 1/4;
    margin: 0 auto;
    width: 90px;
    height: 70px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  div.edit-smoothie {
    max-width: 500px;
    p {
      text-align: center;
      font-size: 2em;
    }
  }
  .field {
    margin: 20px auto;
    position: relative;
    &.center-align {
      p {
        font-size: 14px;
      }
    }
  }
  .delete {
    color: red;
    position: absolute;
    bottom: 20px;
    right: 10px;
    cursor: pointer;
  }
}

</style>
