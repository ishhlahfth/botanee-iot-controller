<template>
  <div>
    <h1>Botane IoT Controller Beta</h1>
    <div class="py-4 flex justify-center flex-col gap-4">
      <div class="py-4 flex justify-center flex-row gap-4">
        <div class="flex flex-col">
          <div class="p-6 m-2 rounded-lg bg-green-100">
            <h2>Pot 1</h2>
            <h2 class="font-bold">{{ deviceStatus.sensor1 }}</h2>
          </div>
          <div>
            <div
              class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in"
            >
              <input
                type="checkbox"
                name="toggle"
                id="toggle"
                v-model="deviceStatus.valve1"
                @change="switchSettings(2, deviceStatus.valve1)"
                class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
              />
              <label
                for="toggle"
                class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
              ></label>
            </div>
            <label for="toggle" class="text-xs text-gray-700">Penyiram 1</label>
          </div>
        </div>
        <div class="flex flex-col">
          <div class="p-6 m-2 rounded-lg bg-green-100">
            <h2>Pot 2</h2>
            <h2 class="font-bold">{{ deviceStatus.sensor2 }}</h2>
          </div>
          <div>
            <div
              class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in"
            >
              <input
                type="checkbox"
                name="toggle"
                id="toggle"
                v-model="deviceStatus.valve2"
                @change="switchSettings(3, deviceStatus.valve2)"
                class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
              />
              <label
                for="toggle"
                class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
              ></label>
            </div>
            <label for="toggle" class="text-xs text-gray-700">Penyiram 2</label>
          </div>
        </div>
      </div>
      <div>
        <div
          class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in"
        >
          <input
            type="checkbox"
            name="toggle"
            id="toggle"
            v-model="deviceStatus.isManual"
            @change="switchSettings(1, deviceStatus.isManual)"
            class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
          />
          <label
            for="toggle"
            class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
          ></label>
        </div>
        <label for="toggle" class="text-xs text-gray-700">Manual Mode.</label>
      </div>
      <div>
        <div
          class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in"
        >
          <input
            type="checkbox"
            name="toggle"
            id="toggle"
            v-model="deviceStatus.isPump"
            @change="switchSettings(4, deviceStatus.isPump)"
            class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
          />
          <label
            for="toggle"
            class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
          ></label>
        </div>
        <label for="toggle" class="text-xs text-gray-700"
          >Sertakan Pompa.</label
        >
      </div>
      <div>
        <button
          class="bg-green-500  text-white font-bold py-2 px-4 rounded"
          @click="loadData()"
          :disabled="refreshLoading"
        >
          Perbaharui Data
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import API from "@/api";
import { useToast } from "vue-toastification";
export default {
  name: "RemoteView",
  setup() {
    const toast = useToast();
    return {
      toast,
    };
  },
  data() {
    return {
      deviceStatus: {
        isManual: false,
        isPump: false,
        valve1: false,
        valve2: false,
        sensor1: "",
        sensor2: "",
      },
      refreshLoading: false,
    };
  },
  methods: {
    buttonTest() {
      this.toast.success("ANULAH IKI");
    },
    async loadData() {
      try {
        this.refreshLoading = true;
        const {
          data: { data },
        } = await API.get("c/settings");
        console.log(data);
        this.deviceStatus.isManual = this.intBoolean(data.is_manual);
        this.deviceStatus.isPump = this.intBoolean(data.is_pump);
        this.deviceStatus.valve1 = this.intBoolean(data.valve_1);
        this.deviceStatus.valve2 = this.intBoolean(data.valve_2);
        this.loadSensorData();
        // this.toast.success("Data Diperbaharui.");
      } catch (error) {
        this.toast.error(error);
      }
    },
    async loadSensorData() {
      try {
        const {
          data: { data },
        } = await API.get("c/latest_log");
        console.log(data);
        this.deviceStatus.sensor1 = data.sensor_1;
        this.deviceStatus.sensor2 = data.sensor_2;
        this.toast.success("Data Diperbaharui.");
        this.refreshLoading = false;
      } catch (error) {
        this.toast.error(error);
      }
    },
    intBoolean(val) {
      if(val > 0) {
        return true;
      }else{
        return false;
      }
    },
    boolInt(val) {
      if(val){
        return 1;
      }else{
        return 0;
      }
    },
    async switchSettings(idSettings, firstVal) {
      try {
        const toggle = !firstVal;
        const payload = {
          id: idSettings,
          value: this.boolInt(toggle),
        }
        const {
          data: { data },
        } = await API.post('c/update_settings', payload);
        console.log(data);
        this.deviceStatus.isManual = this.intBoolean(data.is_manual);
        this.deviceStatus.isPump = this.intBoolean(data.is_pump);
        this.deviceStatus.valve1 = this.intBoolean(data.valve_1);
        this.deviceStatus.valve2 = this.intBoolean(data.valve_2);
        this.toast.success("Berhasil Mengubah");
        this.loadSensorData();
      } catch(error) {
        this.toast.error(error);
      }
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>
<style>
.toggle-checkbox:checked {
  @apply: right-0 border-green-400;
  right: 0;
  border-color: #68d391;
}
.toggle-checkbox:checked + .toggle-label {
  @apply: bg-green-400;
  background-color: #68d391;
}
</style>
