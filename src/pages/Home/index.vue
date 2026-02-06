<script setup lang="ts">
import GroupTopCards from "../../components/GroupTopCards/index.vue";
import Table from "../../components/Table/index.vue";
import Chart from "../../components/Chart/index.vue";
import { useGastos } from "../../stores/useGastos";
import Editor from 'primevue/editor';
import { ref } from "vue";

import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';
import Timeline from 'primevue/timeline';
import OrganizationChart from 'primevue/organizationchart';
import MeterGroup from 'primevue/metergroup';
import ProgressBar from 'primevue/progressbar';
import ProgressSpinner from 'primevue/progressspinner';
import Skeleton from 'primevue/skeleton';

const value = ref('');
const { gastos } = useGastos();
const data = ref({
    key: 'root',
    label: 'Argentina',
    children: [
        {
            key: 'arg-1',
            label: 'Argentina',
            children: [
                {
                    key: 'arg-1-1',
                    label: 'Argentina'
                },
                {
                    key: 'arg-1-2',
                    label: 'Croatia'
                }
            ]
        },
        {
            key: 'fr-1',
            label: 'France',
            children: [
                {
                    key: 'fr-1-1',
                    label: 'France'
                },
                {
                    key: 'fr-1-2',
                    label: 'Morocco'
                }
            ]
        }
    ]
});
const events = ref([
  { status: 'Ordered', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0' },
  { status: 'Processing', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
  { status: 'Shipped', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
  { status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' }
]);

const value2 = ref([
    { label: 'Apps', color: '#34d399', value: 16 },
    { label: 'Messages', color: '#fbbf24', value: 8 },
    { label: 'Media', color: '#60a5fa', value: 24 },
    { label: 'System', color: '#c084fc', value: 10 }
]);
</script>

<template>
  <GroupTopCards />
  <div class="home">
    <Table :gastos="gastos" />
  </div>
  <div class="card-2">
    <Editor v-model="value" editorStyle="height: 320px" />
  </div>
  <Chart />
  <div class="card overflow-x-auto">
    <OrganizationChart :value="data">
      <template #default="slotProps">
        <span>{{ slotProps.node.label }}</span>
      </template>
    </OrganizationChart>
  </div>
  <div class="card flex flex-wrap gap-12">
    <Timeline :value="events" class="w-full md:w-80">
      <template #content="slotProps">
        {{ slotProps.item.status }}
      </template>
    </Timeline>

    <Timeline :value="events" align="right" class="w-full md:w-80">
      <template #content="slotProps">
        {{ slotProps.item.status }}
      </template>
    </Timeline>

    <Timeline :value="events" align="alternate" class="w-full md:w-80">
      <template #content="slotProps">
        {{ slotProps.item.status }}
      </template>
    </Timeline>
  </div>
  <div class="card">
        <Accordion value="0">
            <AccordionPanel value="0">
                <AccordionHeader>Header I</AccordionHeader>
                <AccordionContent>
                    <p class="m-0">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </AccordionContent>
            </AccordionPanel>
            <AccordionPanel value="1">
                <AccordionHeader>Header II</AccordionHeader>
                <AccordionContent>
                    <p class="m-0">
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
                        ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
                    </p>
                </AccordionContent>
            </AccordionPanel>
            <AccordionPanel value="2">
                <AccordionHeader>Header III</AccordionHeader>
                <AccordionContent>
                    <p class="m-0">
                        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa
                        qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
                    </p>
                </AccordionContent>
            </AccordionPanel>
        </Accordion>
    </div>
     <div class="card">
        <MeterGroup :value="value2" />
    </div>
    <div class="card">
    <ProgressBar :value="50"></ProgressBar>
  </div>
  <div class="card">
    <ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
  </div>
  <div class="card flex justify-center">
    <ProgressSpinner />
  </div>
  <div class="card flex justify-center">
    <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="transparent" animationDuration=".5s"
      aria-label="Custom ProgressSpinner" />
  </div>
  <div class="card">
    <div class="flex flex-wrap">
      <div class="w-full xl:w-6/12 p-4">
        <h5>Rectangle</h5>
        <Skeleton class="mb-2"></Skeleton>
        <Skeleton width="10rem" class="mb-2"></Skeleton>
        <Skeleton width="5rem" class="mb-2"></Skeleton>
        <Skeleton height="2rem" class="mb-2"></Skeleton>
        <Skeleton width="10rem" height="4rem"></Skeleton>
      </div>
      <div class="w-full xl:w-6/12 p-4">
        <h5>Rounded</h5>
        <Skeleton class="mb-2" borderRadius="16px"></Skeleton>
        <Skeleton width="10rem" class="mb-2" borderRadius="16px"></Skeleton>
        <Skeleton width="5rem" borderRadius="16px" class="mb-2"></Skeleton>
        <Skeleton height="2rem" class="mb-2" borderRadius="16px"></Skeleton>
        <Skeleton width="10rem" height="4rem" borderRadius="16px"></Skeleton>
      </div>
      <div class="w-full xl:w-6/12 p-4">
        <h5 class="mt-4">Square</h5>
        <div class="flex items-end">
          <Skeleton size="2rem" class="mr-2"></Skeleton>
          <Skeleton size="3rem" class="mr-2"></Skeleton>
          <Skeleton size="4rem" class="mr-2"></Skeleton>
          <Skeleton size="5rem"></Skeleton>
        </div>
      </div>
      <div class="w-full xl:w-6/12 p-4">
        <h5 class="mt-4">Circle</h5>
        <div class="flex items-end">
          <Skeleton shape="circle" size="2rem" class="mr-2"></Skeleton>
          <Skeleton shape="circle" size="3rem" class="mr-2"></Skeleton>
          <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
          <Skeleton shape="circle" size="5rem"></Skeleton>
        </div>
      </div>
    </div>
  </div>
</template>
