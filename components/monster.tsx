import { useState, useMemo, Dispatch, SetStateAction, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { monsters } from "@/lib/monster";
import { Howl } from "howler";

type MonsterProps =
    | {
          id: number;
          mode: "select";
          onSelected: (id: number) => void;
          onAttack?: undefined;
          onInit?: undefined;
      }
    | {
          id: number;
          mode: "battle";
          onAttack: () => void;
          onSelected?: undefined;
          onInit: (setHp: Dispatch<SetStateAction<number>>) => void;
      }
    | {
          id: number;
          mode: "none";
          onSelected: undefined;
          onAttack?: undefined;
          onInit?: undefined;
      };

export default function Monster({
    id,
    mode,
    onInit,
    onSelected,
    onAttack,
}: MonsterProps) {
    const [hp, setHp] = useState(100);

    var sound = useMemo(() => {
        return new Howl({
            src: ["/sounds/attack.mp3"],
            html5: true,
        });
    }, []);

    const monster = useMemo(() => {
        return monsters.find((monster) => monster.id === id);
    }, [id]);

    useEffect(() => {
        onInit?.(setHp);
    }, [setHp, onInit]);

    if (!monster) {
        return null;
    }

    return (
        <div key={id} className="p-4 space-y-2 border shadow-sm">
            <div className="aspect-square relative ">
                <Image
                    src={`/images/monster_${id}.svg`}
                    alt="Monster"
                    unoptimized
                    fill
                />
            </div>
            <h2>{monster.name}</h2>
            {mode === "battle" && (
                <div>
                    <p>HP:{hp}</p>
                    <div className="h-3 rounded-full overflow-hidden border">
                        <div
                            className={cn(
                                "size-full origin-left trasition duration-500",
                                hp > 30 ? "bg-green-500" : "bg-red-500"
                            )}
                            style={{ transform: `scaleX(${hp / 100})` }}
                        ></div>
                    </div>
                </div>
            )}
            {mode === "battle" && (
                <Button
                    onClick={() => {
                        if (!sound.playing()) {
                            sound.play();
                        }
                        onAttack();
                    }}
                    disabled={hp <= 0}
                >
                    アタック
                </Button>
            )}
            {mode === "select" && (
                <Button
                    onClick={() => onSelected(monster.id)}
                    disabled={hp <= 0}
                >
                    選ぶ
                </Button>
            )}
        </div>
    );
}
