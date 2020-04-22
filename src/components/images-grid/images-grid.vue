<template>
  <div>
    <b-pagination v-model="currentPagePaging" :total-rows="totalRowsPaging" @change="onPage"></b-pagination>
    <b-table striped hover bordered noCollapse head-variant="dark" responsive :fields="fields" :items="media">
      <template v-slot:cell(id)="data">
        {{ data.item.image.id }}
      </template>
      <template v-slot:cell(src)="data">
        <div @click="onImageClick(data.item.image.id)">
          <img :src="data.item.image.croppedPicture"  />
        </div>
      </template>
    </b-table>
    <light-box :showLightBox="false" :media="media" ref="lightBox">
      <template v-slot:footer="{ current }">
        <div class="text-nowrap">
          {{ getMediaFooterByIndex(current - 1) }}
        </div>
      </template>
    </light-box>
  </div>
</template>
<script src='./images-grid.ts' />
<style src="./images-grid.scss" lang="scss" />