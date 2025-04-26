const Offline = () => {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 text-center">
      <div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">🔌 Jesteś offline</h1>
        <p className="text-gray-600 text-lg">
          Wygląda na to, że nie masz połączenia z internetem.
          <br />
          Sprawdź połączenie i spróbuj ponownie później.
        </p>
      </div>
    </main>
  );
}

export default Offline;
