
"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Star, HeartPulse, Baby, Stethoscope, School, Users, Venus, PersonStanding, 
  Utensils, Recycle, Shield, Bug, Syringe, Biohazard, Droplets, 
  BarChart, Thermometer, Brain, Dna, FileText, Group, HeartCrack, TrendingUp,
  Briefcase, Smile, Leaf, Ship, Route, LucideProps, PregnantWoman, UserRound
} from "lucide-react";
import { database } from "@/lib/firebase";
import { ref, onValue } from "firebase/database";
import { Skeleton } from "@/components/ui/skeleton";
import DashboardLayout from "@/components/dashboard-layout";

type Program = {
  name: string;
  icon: keyof typeof iconComponents;
  personInCharge: string;
  personInChargePhoto: string;
};

const iconComponents: { [key: string]: React.FC<LucideProps> } = {
  HeartPulse, PersonStanding, Baby, School, Users, Venus, Utensils, Recycle, HeartCrack, Shield, Bug, Thermometer, Biohazard, Droplets, Syringe, BarChart, Stethoscope, Brain, Dna, FileText, Group, Briefcase, Smile, Leaf, Ship, Route, TrendingUp, PregnantWoman, UserRound
};


export default function KegiatanUkmPage() {
  const [essentialPrograms, setEssentialPrograms] = useState<Program[]>([]);
  const [developmentPrograms, setDevelopmentPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const essentialRef = ref(database, 'essentialPrograms');
    const developmentRef = ref(database, 'developmentPrograms');

    const unsubscribeEssential = onValue(essentialRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setEssentialPrograms(Object.values(data));
      } else {
        setEssentialPrograms([]);
      }
      setLoading(false);
    }, (err) => {
      console.error("Firebase read failed (essential): ", err);
      setError("Gagal memuat data program esensial.");
      setLoading(false);
    });

    const unsubscribeDevelopment = onValue(developmentRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setDevelopmentPrograms(Object.values(data));
      } else {
        setDevelopmentPrograms([]);
      }
    }, (err) => {
      console.error("Firebase read failed (development): ", err);
      setError("Gagal memuat data program pengembangan.");
    });

    return () => {
      unsubscribeEssential();
      unsubscribeDevelopment();
    };
  }, []);

  const ProgramCard = ({ program }: { program: Program }) => {
    const IconComponent = iconComponents[program.icon] || Star;
    return (
      <Card className="flex flex-col justify-between transition-all hover:shadow-lg hover:-translate-y-1">
        <CardHeader>
          <div className="flex items-start gap-4">
            <IconComponent className="h-7 w-7 text-primary flex-shrink-0" />
            <CardTitle className="text-base font-semibold leading-tight">{program.name}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="mt-auto flex items-center gap-3 pt-4">
            <Avatar className="size-10">
                <AvatarImage data-ai-hint="person face" src={program.personInChargePhoto} alt={program.personInCharge} />
                <AvatarFallback>{program.personInCharge.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
                <p className="text-sm font-medium">{program.personInCharge}</p>
                <p className="text-xs text-muted-foreground">Penanggung Jawab</p>
            </div>
        </CardContent>
      </Card>
    )
  }

  const ProgramSkeleton = () => (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <div className="flex items-start gap-4">
          <Skeleton className="h-7 w-7 rounded-md" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="mt-auto flex items-center gap-3 pt-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-1">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-3 w-[80px]" />
        </div>
      </CardContent>
    </Card>
  );

  return (
    <DashboardLayout pageTitle="Kegiatan UKM">
      <div className="flex flex-1 flex-col gap-4">
        {error && <div className="text-red-500 text-center p-4 bg-red-100 rounded-md">{error}</div>}
        
        <div className="flex items-center gap-2">
          <Star className="h-6 w-6" />
          <h1 className="text-lg font-semibold md:text-2xl">UKM Esensial</h1>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 10 }).map((_, index) => <ProgramSkeleton key={index} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {essentialPrograms.map((program, index) => (
              <ProgramCard key={index} program={program} />
            ))}
          </div>
        )}

        <div className="mt-8 flex items-center gap-2">
          <TrendingUp className="h-6 w-6" />
          <h1 className="text-lg font-semibold md:text-2xl">UKM Pengembangan</h1>
        </div>
          {loading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 5 }).map((_, index) => <ProgramSkeleton key={index} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {developmentPrograms.map((program, index) => (
              <ProgramCard key={index} program={program} />
            ))}
          </div>
          )}
      </div>
    </DashboardLayout>
  );
}
