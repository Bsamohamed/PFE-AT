const ping = require('ping');

const gatewayList = [
  { id: 'vyos-1', ip: '192.168.4.40', name: 'Main Gateway' },
  { id: 'vyos-2', ip: '192.168.4.20', name: 'Main Gateway 2' },
  { id: 'vyos-3', ip: '192.168.4.30', name: 'Main Gateway 3' },
];

exports.fetchGatewaysStatus = async () => {
  const results = await Promise.all(
    gatewayList.map(async (gateway) => {
      const res = await ping.promise.probe(gateway.ip);
      return {
        ...gateway,
        status: res.alive ? 'online' : 'offline',
        lastChecked: new Date().toISOString()
      };
    })
  );
  return results;
};
