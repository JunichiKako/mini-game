"use client";

import { Button } from "@/components/ui/button";
import Monster from "@/components/monster";
import Link from "next/link";
import { useMonster } from "./provider/monster";
import { monsters } from "@/lib/monster";

export default function Home() {
    const { myMonsterId, setMyMonsterId } = useMonster();

    return (
        <main className="container py-10">
            {myMonsterId && (
                <div>
                    <h2>あなたのモンスターは</h2>
                    {myMonsterId && (
                        <div className="w-40">
                            <Monster
                                mode="select"
                                onSelected={(id: number) => {
                                    setMyMonsterId(id);
                                }}
                                id={myMonsterId}
                            />
                        </div>
                    )}
                </div>
            )}

            <Button asChild>
                <Link href="/battle">戦闘開始</Link>
            </Button>

            <h2 className="font-bold text-2xl">モンスターを選んでね</h2>
            <div className="grid gap-4 grid-cols-3 ">
                {monsters.map((monster, i) => {
                    return (
                        <Monster
                            key={monster.id}
                            id={monster.id}
                            mode="select"
                            onSelected={(id) => {
                                setMyMonsterId(id);
                            }}
                        />
                    );
                })}
            </div>
        </main>
    );
}
