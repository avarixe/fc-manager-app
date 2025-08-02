import { teamAtom } from "@/atoms";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { Tables } from "@/database-generated.types";
import { formatDate } from "@/utils/format";
import { supabase } from "@/utils/supabase";
import { router, useNavigation } from "expo-router";
import { useSetAtom } from "jotai";
import { CirclePlus, Shield } from "lucide-react-native";
import { useEffect, useState } from "react";
import { FlatList, Image, TouchableOpacity, View } from "react-native";

export default function SelectTeamScreen() {
  const [teams, setTeams] = useState<Tables<"teams">[]>([]);
  useEffect(() => {
    const fetchTeams = async () => {
      const { data, error } = await supabase
        .from("teams")
        .select()
        .order("created_at", { ascending: false });
      if (data) {
        setTeams(data);
      } else {
        console.error(error);
      }
    };

    fetchTeams();
  }, []);

  const navigation = useNavigation();
  useEffect(() => {
    const listener = navigation.addListener("beforeRemove", (e) => {
      if (e.data.action.type === "GO_BACK") {
        e.preventDefault();
      }
    });

    return () => {
      navigation.removeListener("beforeRemove", listener);
    };
  }, [navigation]);

  const setTeam = useSetAtom(teamAtom);
  const onPressTeam = (team: Tables<"teams">) => {
    setTeam(team);
    router.push("/");
  };

  const renderItem = ({ item }: { item: Tables<"teams"> }) => (
    <TouchableOpacity onPress={() => onPressTeam(item)}>
      <View className="flex-row items-center gap-4 p-4">
        {item.badge_path ? (
          <Image
            source={{ uri: item.badge_path }}
            className="w-12 h-12 rounded-full"
          />
        ) : (
          <Icon as={Shield} className="w-12 h-12" />
        )}
        <View className="flex-col">
          <Heading size="lg">{item.name}</Heading>
          <Text>
            {item.manager_name} · {formatDate(item.created_at)}
          </Text>
          <Text>
            {formatDate(item.started_on, "yyyy")} -{" "}
            {formatDate(item.currently_on, "yyyy")}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  // TODO: use Skeleton in Empty State

  return (
    <FlatList
      data={teams}
      renderItem={renderItem}
      keyExtractor={(item) => String(item.id)}
      ItemSeparatorComponent={() => <Divider />}
      ListFooterComponent={
        <>
          <Divider />
          <Button
            onPress={() => router.push("/team-form")}
            variant="outline"
            size="lg"
            className="mx-8 my-4"
          >
            <ButtonIcon as={CirclePlus} />
            <ButtonText>Add Team</ButtonText>
          </Button>
        </>
      }
    />
  );
}
