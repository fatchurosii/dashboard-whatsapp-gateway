import Swal from "sweetalert2";
import { useEnvironmentStore } from "@src/stores/environment";

declare var KTDialer: any;
declare var KTImageInput: any;
declare var KTDrawer: any;
declare var KTMenu: any;
declare var KTPasswordMeter: any;
declare var KTScroll: any;
declare var KTScrolltop: any;
declare var KTSticky: any;
declare var KTSwapper: any;
declare var KTToggle: any;
declare var KTUtil: any;
declare var KTApp: any;
declare var KTAppSidebar: any;
declare var KTLayoutSearch: any;
declare var KTLayoutToolbar: any;
declare var KTAppLayoutBuilder: any;
declare var KTThemeModeUser: any;
declare var KTThemeMode: any;

export function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export async function handleErrorApi(error: any, redirect401 = true) {
  let res = error.response ? error.response.data : null;
  let code = error.response ? error.response.status : null;
  const environmentStore = useEnvironmentStore();
  switch (code) {
    case 400:
      await Message.error(res?.message);
      break;
    case 401:
      if (redirect401) {
        const SubDirectory = environmentStore.data.subDirectory;
        if (SubDirectory === "/" || !SubDirectory) {
          window.location.replace("/login");
        } else {
          window.location.replace(SubDirectory + "/login");
        }
      } else {
        await Message.error(res?.message);
      }
      break;
    case 402:
      await Message.error("Payment Required!");
      break;
    case 403:
      await Message.error("Forbidden access, please contact developer!");
      break;
    case 404:
      await Message.error(res?.message);
      break;
    case 405:
      await Message.error("Method Not Allowed!");
      break;
    case 408:
      await Message.error("Request Timeout!");
      break;
    case 413:
      await Message.error("Content Too Large!");
      break;
    case 414:
      await Message.error("URI Too Long!");
      break;
    case 422:
      let resOther = "";
      if (res?.data?.errors && Array.isArray(res?.data?.errors)) {
        for (let i = 0; i < res?.data?.errors.length; i++) {
          resOther += `<br> ${res?.data?.errors[i].message} `;
        }
      }
      let text =
        res?.message +
        `<br><div style="font-size:14px">` +
        resOther +
        `</div>`;
      await Message.error(text);
      break;
    case 429:
      await Message.error("Too Many Requests!");
      break;
    case 500:
      await Message.error("Internal Server Error!");
      break;
    case 502:
      await Message.error("Bad Gateway!");
      break;
    case 503:
      await Message.error("Service Unavailable!");
      break;
    case 504:
      await Message.error("Gateway Timeout!");
      break;
  }
}

export function loader(type: string) {
  // type = show | hide
  const el = document.querySelector(".loader-block");

  if (type === "show") {
    el?.classList.remove("d-none");
  } else if (type === "hide") {
    el?.classList.add("d-none");
  }
}

export function rupiahFormat(amount: number) {
  if (!amount) {
    return "0";
  }
  return new Intl.NumberFormat("id-ID", {
    maximumFractionDigits: 5,
  }).format(Number(amount));
}

export function stringToNumber(amount: any) {
  if (amount == "" || amount == undefined || amount == null) {
    return 0;
  } else {
    return isNaN(Number(amount)) ? 0 : Number(amount);
  }
}

export function initMetronicPlugin() {
  // Initial cleanup and overlay removal
  $(".drawer-overlay").remove();

  // Delay initialization to allow DOM readiness
  setTimeout(() => {
    KTDialer.init();
    KTDrawer.init();
    KTImageInput.init();
    KTMenu.createInstances();
    KTPasswordMeter.init();
    KTScroll.init();
    KTScrolltop.init();
    KTSticky.init();
    KTSwapper.init();
    KTToggle.init();

    KTUtil.onDOMContentLoaded(() => {
      KTAppLayoutBuilder.init();
      KTApp.init();
      KTThemeModeUser.init();
      KTAppSidebar.init();
      KTLayoutSearch.init();
      KTLayoutToolbar.init();
      KTThemeMode.init();
    });

    // addEventListener("load", () => {
    //   KTApp.initPageLoader();
    // });

    if (typeof module !== "undefined" && module.exports) {
      module.exports = KTApp;
    }

    // Post-initialization body attributes
    $("body")
      .attr({
        "data-kt-drawer-aside": "off",
        "data-kt-drawer": "off",
        "data-kt-aside-minimize": "off",
      })
      .removeClass("modal-open");
  }, 100);

  // Overlay cleanup on mobile toggle click
  $("#kt_aside_mobile_toggle").on("click", function () {
    setTimeout(() => {
      $(".drawer-overlay").each(function () {
        if ($(".drawer-overlay").length > 1) {
          $(this).remove();
        }
      });
    }, 10);
  });
}

export const Message = {
  async success(message: string) {
    let swal = await Swal.fire({
      title: "Berhasil!",
      text: message,
      icon: "success",
      confirmButtonText: "OK",
    });
    const result = swal.isConfirmed;
    return result;
  },
  async warning(message: string) {
    let swal = await Swal.fire({
      title: "Perhatian!",
      text: message,
      icon: "warning",
      confirmButtonText: "OK",
    });
    const result = swal.isConfirmed;
    return result;
  },
  async error(message: string) {
    let swal = await Swal.fire({
      title: "Gagal!",
      text: message,
      icon: "error",
      confirmButtonText: "OK",
    });
    const result = swal.isConfirmed;
    return result;
  },
  async question(title: string, text: string, confirmButtonText = "Ya") {
    let swal = await Swal.fire({
      title: title,
      html: text,
      icon: "warning",
      showCancelButton: true,
      customClass: {
        confirmButton: "bg-danger",
        cancelButton: "bg-light text-dark",
      },
      cancelButtonColor: "#ddd",
      confirmButtonText: confirmButtonText,
      cancelButtonText: "Batal",
      reverseButtons: true,
    });
    const result = swal.isConfirmed;
    return result;
  },
};

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getToken() {
  const environmentStore = useEnvironmentStore();
  return localStorage.getItem(environmentStore.data.localStorageToken);
}

// for extract data array from api: [ada, aku, kamu] -> ada, aku, kamu
export const arrayDataToComma = (data: any[], key = "") => {
  if (!Array.isArray(data)) return "-";
  const result = data.map((item: any) => item?.text ?? item[key]?.name ?? "-");
  return result.join(", ");
};
