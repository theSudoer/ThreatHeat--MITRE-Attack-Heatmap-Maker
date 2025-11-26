import React, { useState, useCallback } from 'react';
import { fetchThreatActorData } from './services/geminiService';
import { ActorProfile } from './types';
import Matrix from './components/Matrix';

// Lucide React for icons
import { Search, ShieldAlert, Globe, Target, Loader2, AlertTriangle } from 'lucide-react';

const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [actorProfile, setActorProfile] = useState<ActorProfile | null>(null);

  const handleSearch = useCallback(async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setActorProfile(null);

    try {
      const data = await fetchThreatActorData(query);
      setActorProfile(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch threat intelligence. Please check the name or try again.");
    } finally {
      setLoading(false);
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-cyber-900 text-gray-200 font-sans selection:bg-cyber-accent selection:text-black flex flex-col">
      
      {/* Navbar / Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-cyber-danger rounded-sm flex items-center justify-center shadow-[0_0_10px_rgba(255,42,109,0.5)]">
              <ShieldAlert className="text-white w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white">
              THREAT<span className="text-cyber-accent">HEAT</span>
            </h1>
          </div>
          
          <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4 relative">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                <input 
                  type="text" 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter threat actor (e.g. APT28, Lazarus)" 
                  className="w-full bg-gray-950 border border-gray-700 text-white text-sm rounded-md pl-10 pr-4 py-2 focus:outline-none focus:border-cyber-accent focus:ring-1 focus:ring-cyber-accent transition-all placeholder-gray-600"
                />
             </div>
          </form>

          <div className="hidden md:block text-xs text-gray-500 font-mono">
            MITRE ATT&CK v14.1
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col max-w-full overflow-hidden">
        
        {/* Loading State */}
        {loading && (
          <div className="flex-1 flex flex-col items-center justify-center p-12 space-y-4">
             <Loader2 className="w-12 h-12 text-cyber-accent animate-spin" />
             <p className="text-cyber-accent font-mono text-sm animate-pulse">ANALYZING THREAT INTEL...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-8 flex justify-center">
            <div className="bg-red-900/20 border border-red-800 text-red-200 p-4 rounded-md flex items-center gap-3 max-w-xl">
              <AlertTriangle className="w-6 h-6" />
              <p>{error}</p>
            </div>
          </div>
        )}

        {/* Empty State (Initial) */}
        {!loading && !actorProfile && !error && (
           <div className="flex-1 flex flex-col items-center justify-center p-12 opacity-40">
              <ShieldAlert className="w-24 h-24 text-gray-700 mb-4" />
              <h2 className="text-2xl font-bold text-gray-600">Awaiting Target Designation</h2>
              <p className="text-gray-600 mt-2">Enter a threat actor name to generate TTP heatmap.</p>
           </div>
        )}

        {/* Results View */}
        {!loading && actorProfile && (
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            
            {/* Actor Summary Banner */}
            <div className="bg-gray-900 border-b border-gray-800 p-6 shadow-lg z-20">
               <div className="max-w-7xl mx-auto">
                 <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                        {actorProfile.name}
                        {actorProfile.origin && (
                          <span className="text-sm font-normal font-mono bg-gray-800 px-2 py-1 rounded text-gray-400 border border-gray-700 flex items-center gap-1">
                             <Globe className="w-3 h-3" /> {actorProfile.origin}
                          </span>
                        )}
                      </h2>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {actorProfile.aliases.map(alias => (
                          <span key={alias} className="text-xs text-cyber-accent bg-cyber-accent/10 px-2 py-0.5 rounded border border-cyber-accent/20">
                            {alias}
                          </span>
                        ))}
                      </div>
                      <p className="text-gray-400 text-sm max-w-3xl leading-relaxed">
                        {actorProfile.description}
                      </p>
                    </div>

                    <div className="md:text-right min-w-[200px]">
                       <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 flex items-center md:justify-end gap-2">
                         <Target className="w-3 h-3" /> Known Targets
                       </div>
                       <div className="flex flex-wrap md:justify-end gap-2">
                          {actorProfile.targets.slice(0, 4).map(t => (
                            <span key={t} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">
                              {t}
                            </span>
                          ))}
                          {actorProfile.targets.length > 4 && (
                            <span className="text-xs text-gray-500 py-1">+{actorProfile.targets.length - 4} more</span>
                          )}
                       </div>
                    </div>
                 </div>
               </div>
            </div>

            {/* Matrix Container */}
            <div className="flex-1 relative bg-black p-4 overflow-hidden">
               <Matrix actorProfile={actorProfile} />
               <div className="absolute bottom-6 right-6 flex items-center gap-4 bg-gray-900/80 backdrop-blur p-2 rounded-lg border border-gray-800 text-xs text-gray-400">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-800 border border-gray-700"></div> Unused
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-200"></div> Low Conf
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-600"></div> High Conf
                  </div>
               </div>
            </div>

          </div>
        )}
      </main>
    </div>
  );
};

export default App;