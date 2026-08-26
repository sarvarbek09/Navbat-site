"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { LocateFixed, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { DEFAULT_MAP_CENTER, haversineDistanceKm, type LatLng } from "@/lib/geo";

export type NearbySalon = {
  id: string;
  name: string;
  address: string | null;
  latitude: number;
  longitude: number;
};

type LocateStatus = "idle" | "locating" | "granted" | "denied" | "unsupported";

const salonIcon = L.divIcon({
  className: "",
  html: `<div style="display:flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:9999px;background:rgb(var(--primary));border:2px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.25)">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
  </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const userIcon = L.divIcon({
  className: "",
  html: `<div style="width:16px;height:16px;border-radius:9999px;background:#2563eb;border:3px solid white;box-shadow:0 0 0 4px rgba(37,99,235,0.25)"></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

export function NearbySalonsMapInner({ salons }: { salons: NearbySalon[] }) {
  const t = useTranslations("nearbySalons");
  const [status, setStatus] = useState<LocateStatus>("idle");
  const [userPosition, setUserPosition] = useState<LatLng | null>(null);

  const requestLocation = () => {
    if (!("geolocation" in navigator)) {
      setStatus("unsupported");
      return;
    }
    setStatus("locating");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setStatus("granted");
      },
      () => setStatus("denied"),
      { enableHighAccuracy: true, timeout: 10_000 }
    );
  };

  useEffect(() => {
    requestLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const center = userPosition ?? DEFAULT_MAP_CENTER;

  const sortedSalons = useMemo(() => {
    return [...salons]
      .map((salon) => ({
        ...salon,
        distanceKm: haversineDistanceKm(center, {
          lat: salon.latitude,
          lng: salon.longitude,
        }),
      }))
      .sort((a, b) => a.distanceKm - b.distanceKm)
      .slice(0, 6);
  }, [salons, center]);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
      <div className="relative overflow-hidden rounded-2xl border border-border shadow-soft-sm">
        <MapContainer
          center={[center.lat, center.lng]}
          zoom={userPosition ? 13 : 11}
          scrollWheelZoom={false}
          className="h-[420px] w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {userPosition && (
            <Marker position={[userPosition.lat, userPosition.lng]} icon={userIcon} />
          )}
          {sortedSalons.map((salon) => (
            <Marker
              key={salon.id}
              position={[salon.latitude, salon.longitude]}
              icon={salonIcon}
            >
              <Popup>
                <div className="text-sm font-semibold text-foreground">{salon.name}</div>
                {salon.address && (
                  <div className="text-xs text-muted-foreground">{salon.address}</div>
                )}
                <Link
                  href={`/salons/${salon.id}`}
                  className="mt-1 inline-block text-xs font-bold text-primary hover:underline"
                >
                  {t("viewSalon")}
                </Link>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        <button
          type="button"
          onClick={requestLocation}
          className="absolute right-3 top-3 z-[1000] flex items-center gap-1.5 rounded-full border border-border bg-white/95 px-3 py-2 text-xs font-semibold text-foreground shadow-soft-sm backdrop-blur-sm transition-colors hover:bg-white"
        >
          <LocateFixed className="size-3.5 text-primary" />
          {status === "locating" ? t("locating") : t("locateButton")}
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {status === "denied" && (
          <p className="rounded-xl bg-amber-50 px-4 py-3 text-xs font-medium text-amber-700">
            {t("permissionDenied")}
          </p>
        )}
        {status === "unsupported" && (
          <p className="rounded-xl bg-amber-50 px-4 py-3 text-xs font-medium text-amber-700">
            {t("unsupported")}
          </p>
        )}

        {sortedSalons.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            <MapPin className="size-6 text-muted-foreground/50" />
            {t("empty")}
          </div>
        ) : (
          sortedSalons.map((salon) => (
            <Link
              key={salon.id}
              href={`/salons/${salon.id}`}
              className="flex items-center justify-between gap-3 rounded-xl border border-border bg-white p-4 shadow-soft-sm transition-colors hover:border-primary/40"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">
                  {salon.name}
                </p>
                {salon.address && (
                  <p className="truncate text-xs text-muted-foreground">
                    {salon.address}
                  </p>
                )}
              </div>
              <span className="shrink-0 text-xs font-bold text-primary">
                {t("distanceAway", { distance: salon.distanceKm.toFixed(1) })}
              </span>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
