import { TextInput } from 'react-native';

type SearchBarProps = {
  search: string;
  setSearch: (value: string) => void;
};

export function SearchBar({
  search,
  setSearch,
}: SearchBarProps) {
  return (
    <TextInput
      placeholder="🔎 Pesquisar por título"
      value={search}
      onChangeText={setSearch}
      style={{
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 12,
        marginBottom: 15,
        backgroundColor: '#fff',
      }}
    />
  );
}